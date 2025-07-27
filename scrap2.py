import requests

def get_cve_data(cve_id):
    base_url = "https://cve.circl.lu/api/cve/"
    url = f"{base_url}{cve_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve data for {cve_id}. Status code: {response.status_code}")
        return None

def format_cve_data(cve_data):
    if cve_data:
        formatted_data = [{
            'title':' ',
            "CVE": cve_data.get('id'),
            "image":"https://incident.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Foqy5aexb%2Fproduction%2F2c1e4780d44f1214093305fbf6acf272b9423d38-1456x816.png&w=3840&q=75",
            "Description ": cve_data.get('summary'),
            "published_date": cve_data.get('Published'),
            "Severity": cve_data.get('cvss'),
            "references": cve_data.get('references', []),

            "impact": cve_data.get('impact'),
        }]
        return formatted_data
    else:
        print("No data available for the provided CVE ID.")
        return []

def main():
    cve_id = input()
    cve_data = get_cve_data(cve_id)
    formatted_data = format_cve_data(cve_data)
    print(formatted_data)

if __name__ == "__main__":
    main()