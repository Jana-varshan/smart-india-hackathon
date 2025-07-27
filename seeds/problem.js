module.exports=[
  {
    "title": "Unauthorized Access Issue",
    "image": "https://example.com/issue1.jpg",
    "description": "An unauthorized user can gain access to restricted resources by exploiting a vulnerability in the authentication process.",
    "seviyarity": "High",
    "cve": "CVE-2019-1423",
    "patch": "https://patches.example.com/solution/unauthorized-access-fix",
    "solution": "Update authentication mechanisms to include token validation."
  },
  {
    "title": "SQL Injection Vulnerability",
    "image": "https://example.com/issue2.jpg",
    "description": "The application is vulnerable to SQL Injection attacks allowing attackers to access sensitive database information.",
    "seviyarity": "Critical",
    "cve": "CVE-2020-5461",
    "patch": "https://patches.example.com/solution/sql-injection-patch",
    "solution": "Sanitize user inputs and use prepared statements for database queries."
  },
  {
    "title": "Cross-Site Scripting (XSS)",
    "image": "https://example.com/issue3.jpg",
    "description": "Reflected XSS vulnerability allows attackers to execute malicious scripts in the victim’s browser.",
    "seviyarity": "Medium",
    "cve": "CVE-2018-8932",
    "patch": "https://patches.example.com/solution/xss-patch",
    "solution": "Encode output in HTML and use content security policies to mitigate XSS."
  },
  {
    "title": "Denial of Service (DoS)",
    "image": "https://example.com/issue4.jpg",
    "description": "A vulnerability causing the application to become unresponsive under heavy traffic due to resource exhaustion.",
    "seviyarity": "Low",
    "cve": "CVE-2021-6782",
    "patch": "https://patches.example.com/solution/dos-fix",
    "solution": "Optimize resource allocation and rate-limit incoming traffic."
  },
  {
    "title": "Privilege Escalation Bug",
    "image": "https://example.com/issue5.jpg",
    "description": "A local attacker can escalate privileges by exploiting a flaw in the operating system's kernel.",
    "seviyarity": "Critical",
    "cve": "CVE-2022-1327",
    "patch": "https://patches.example.com/solution/privilege-escalation-patch",
    "solution": "Apply patches to fix kernel privilege management issues."
  },
  {
    "title": "Remote Code Execution (RCE)",
    "image": "https://example.com/issue6.jpg",
    "description": "A flaw in the input validation allows remote attackers to execute arbitrary code on the server.",
    "seviyarity": "Critical",
    "cve": "CVE-2017-2221",
    "patch": "https://patches.example.com/solution/rce-vulnerability-patch",
    "solution": "Ensure proper validation of inputs and apply server-side checks."
  },
  {
    "title": "Directory Traversal",
    "image": "https://example.com/issue7.jpg",
    "description": "Attackers can exploit this vulnerability to gain access to sensitive files outside the web root directory.",
    "seviyarity": "Medium",
    "cve": "CVE-2016-4234",
    "patch": "https://patches.example.com/solution/directory-traversal-patch",
    "solution": "Sanitize file paths and restrict access to sensitive directories."
  },
  {
    "title": "Buffer Overflow Vulnerability",
    "image": "https://example.com/issue8.jpg",
    "description": "A buffer overflow in the input parser allows attackers to crash the system or execute arbitrary code.",
    "seviyarity": "High",
    "cve": "CVE-2015-6731",
    "patch": "https://patches.example.com/solution/buffer-overflow-patch",
    "solution": "Implement bounds checking and proper input handling."
  },
  {
    "title": "Session Fixation",
    "image": "https://example.com/issue9.jpg",
    "description": "Attackers can hijack user sessions by exploiting session management flaws.",
    "seviyarity": "Low",
    "cve": "CVE-2023-1045",
    "patch": "https://patches.example.com/solution/session-fixation-patch",
    "solution": "Regenerate session IDs after login and apply secure cookie attributes."
  },
  {
    "title": "Insecure File Upload",
    "image": "https://example.com/issue10.jpg",
    "description": "The file upload mechanism does not properly validate file types, allowing malicious file uploads.",
    "seviyarity": "High",
    "cve": "CVE-2019-7834",
    "patch": "https://patches.example.com/solution/insecure-upload-patch",
    "solution": "Implement file type validation and restrict file permissions."
  },
  {
    "title": "Weak Encryption",
    "image": "https://example.com/issue11.jpg",
    "description": "Sensitive data is encrypted using weak algorithms, making it vulnerable to cryptographic attacks.",
    "seviyarity": "Medium",
    "cve": "CVE-2017-9453",
    "patch": "https://patches.example.com/solution/weak-encryption-fix",
    "solution": "Upgrade to stronger encryption algorithms like AES-256."
  },
  {
    "title": "API Rate Limiting Bypass",
    "image": "https://example.com/issue12.jpg",
    "description": "The application allows attackers to bypass rate limiting on API endpoints, enabling brute-force attacks.",
    "seviyarity": "Low",
    "cve": "CVE-2020-4382",
    "patch": "https://patches.example.com/solution/api-rate-limit-fix",
    "solution": "Implement more robust rate-limiting mechanisms and IP-based blocking."
  },
  {
    "title": "Open Redirect",
    "image": "https://example.com/issue13.jpg",
    "description": "A flaw in URL handling allows attackers to redirect users to malicious websites.",
    "seviyarity": "Low",
    "cve": "CVE-2016-2398",
    "patch": "https://patches.example.com/solution/open-redirect-fix",
    "solution": "Validate and sanitize all redirect URLs."
  },
  {
    "title": "Missing Authentication for Critical Function",
    "image": "https://example.com/issue14.jpg",
    "description": "An attacker can execute critical functions without proper authentication due to missing checks.",
    "seviyarity": "Critical",
    "cve": "CVE-2021-2567",
    "patch": "https://patches.example.com/solution/missing-authentication-fix",
    "solution": "Implement strict authentication checks for critical functions."
  },
  {
    "title": "Security Misconfiguration",
    "image": "https://example.com/issue15.jpg",
    "description": "The web server is configured with default settings, exposing it to potential attacks.",
    "seviyarity": "Medium",
    "cve": "CVE-2018-6642",
    "patch": "https://patches.example.com/solution/security-misconfiguration-patch",
    "solution": "Reconfigure the web server to follow security best practices."
  }
]
