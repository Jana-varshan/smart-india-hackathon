import google.generativeai as genai
import requests

GOOGLE_API_KEY = "AIzaSyASTLUc94D7zqq6hNb4QIgLo-xSyaDjfFM"
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-pro")

def respond_to_question(question):
    """Generate a response for the given question using Gemini."""
    response = model.generate_content(question)
    return response.text

def process_question(cve_data):
    """Generate title and solution from the CVE data using Gemini."""
    question = f"For the following info,NO * ANYWHERE , I want you to generate only a concise title and suitable solution in one line. Directly give the title and solution, no need of heading. Solution should be how to solve the problem in 3 lines. REMOVE THE * and space. As title:, solution: {cve_data}"
    response = respond_to_question(question)
    return response

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
        formatted_data = {
            "CVE": cve_data.get('id'),
            "Description": cve_data.get('summary'),
            "published_date": cve_data.get('Published'),
            "last_modified": cve_data.get('Modified'),
            "Severity": cve_data.get('cvss'),
            "references": cve_data.get('references', []),
            "impact": cve_data.get('impact'),
        }
        return formatted_data
    else:
        print("No data available for the provided CVE ID.")
        return {}

def main():
    cve_id = input("Enter the CVE ID (e.g., CVE-2010-3333): ")
    cve_data = get_cve_data(cve_id)
    if cve_data:
        formatted_data = format_cve_data(cve_data)
        cve_data_str = f"CVE ID: {formatted_data['CVE']}, Description: {formatted_data['Description']}, Published Date: {formatted_data['published_date']}, Last Modified: {formatted_data['last_modified']}, Severity: {formatted_data['Severity']}, References: {', '.join(formatted_data['references'])}, Impact: {formatted_data['impact']}"
        result = process_question(cve_data_str)
        
        response_lines = result.strip().split('Solution:')
        if len(response_lines) >= 2:
            title = response_lines[0].strip()
            solution = response_lines[1].strip()
            

            if title.lower().startswith("title:"):
                title = title[6:].strip()
            
           
            solution = solution.strip()
            
            
            response_data = [
                {
                    "Title": title,
                    "Solution": solution,
                    "CVE Data": formatted_data
                }
            ]
            print(response_data)
        else:
            print(f"Unexpected response format:\n{result}")
    else:
        print("No CVE data available to process.")

if __name__ == "__main__":
    main()