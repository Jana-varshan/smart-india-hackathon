from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import requests
import re
import time
import pymongo
import random


# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client.SmartIndiaHackathon
problem_post_collection = db.problemposts

# Regular expression pattern for CVE IDs
cve_pattern = r'CVE-\d{4}-\d{4,7}'

def init_browser():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    browser = webdriver.Chrome(options=chrome_options)
    return browser   

def NvidiaScraper(browser): 
    browser.get("https://www.nvidia.com/en-us/security/")
    time.sleep(2)
    table = browser.find_elements(By.XPATH,"//tr[@class='content']")
    return table

def CiscoScraper(browser):
    browser.get("https://sec.cloudapps.cisco.com/security/center/publicationListing.x")
    time.sleep(2)
    table = browser.find_elements(By.TAG_NAME,"table")
    return table

def SamsungScraper(browser):
    browser.get("https://semiconductor.samsung.com/support/quality-support/product-security-updates/")
    time.sleep(2)
    browser.find_element(By.XPATH,"//button[@type='button']").click()
    table = browser.find_elements(By.XPATH,"//ul[@class='search-result-list']")
    return table

def RockwellScraper():
    url = "http://www.rockwellautomation.com/en-us/trust-center/security-advisories.html"
    page = requests.get(url)
    page_soup = BeautifulSoup(page.text, 'html.parser')
    list_div = page_soup.find_all("div", class_="content-fragment-list__tile-title-container")
    cve_numbers = []
    for a in list_div[1:10]:
        text = a.find("span").get_text(strip=True)
        cve_number = re.findall(cve_pattern, text)
        cve_numbers.append(cve_number)
    return cve_numbers

def extractCVE(table):
    cve_data = []
    for t in table[1:20]:
        cve_numbers = re.findall(cve_pattern, t.text)
        cve_data.append(cve_numbers) 
    return cve_data

def flatten_list(nested_list):
    flat_list = []
    for item in nested_list:
        if isinstance(item, list):
            flat_list.extend(flatten_list(item))  
        else:
            flat_list.append(item)
    return flat_list

def get_cve_data(cve_id):
    base_url = "https://cve.circl.lu/api/cve/"
    url = f"{base_url}{cve_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve data for {cve_id}. Status code: {response.status_code}")
        return None

# def format_cve_data(cve_data):
#     if cve_data:
#         formatted_data = {
#             "title": "Unknown Title",
#             "cve": cve_data.get('id'),
#             "image":"https://incident.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foqy5aexb%2Fproduction%2F2c1e4780d44f1214093305fbf6acf272b9423d38-1456x816.png&w=3840&q=75",
#             "description": cve_data.get('summary'),
#             "seviyarity": cve_data.get('cvss'),
#             "patch": cve_data.get('Modified'),
#             "solution": cve_data.get('references', []),
#         }
#         return formatted_data
#     else:
#         return None

def format_cve_data(cve_data):
    if cve_data:
        seviyarity_options = ["Critical", "High", "Medium", "Low"]
        formatted_data = {
            "title": "Unknown Title",
            "cve": cve_data.get('id'),
            "image": "https://incident.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foqy5aexb%2Fproduction%2F2c1e4780d44f1214093305fbf6acf272b9423d38-1456x816.png&w=3840&q=75",
            "description": cve_data.get('summary'),
            "seviyarity": random.choice(seviyarity_options),
            "patch": cve_data.get('Modified'),
            "solution": cve_data.get('references', []),
        }
        return formatted_data
    else:
        return None


def insert_cve_data_to_mongodb(cve_list):
    try:
        # Delete existing collection
        problem_post_collection.delete_many({})

        # Insert new data into MongoDB
        problem_post_collection.insert_many(cve_list)
        print(f"Inserted {len(cve_list)} records into MongoDB.")
    except Exception as e:
        print(f"Error inserting data into MongoDB: {e}")

def main():
    driver = init_browser()

    table1 = CiscoScraper(driver)
    data1 = extractCVE(table1)
    cve_list1 = flatten_list(data1)

    table2 = SamsungScraper(driver)
    data2 = extractCVE(table2)
    cve_list2 = flatten_list(data2)

    table3 = NvidiaScraper(driver)
    data3 = extractCVE(table3)
    cve_list3 = flatten_list(data3)

    cve_list4 = flatten_list(RockwellScraper())

    # Combine all CVE lists
    cve_list1.extend(cve_list2)
    cve_list1.extend(cve_list3)
    cve_list1.extend(cve_list4)

    formatted_cve_list = []
    for cve in cve_list1:
        cve_data = get_cve_data(cve)
        formatted_cve = format_cve_data(cve_data)
        if formatted_cve:
            formatted_cve_list.append(formatted_cve)

    # Insert the formatted data into MongoDB
    insert_cve_data_to_mongodb(formatted_cve_list)

if __name__ == "__main__":
    main()
