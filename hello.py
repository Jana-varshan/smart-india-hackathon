import smtplib
from pymongo import MongoClient
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['SmartIndiaHackathon']
collection = db['alerts']

# Email settings (replace with your credentials)
mail = "janasample123@gmail.com"
password = "nyhh nzpq toxf nwzt"  # Replace with your generated app password

def send_alert_email(recipient_email, subject, body):
    """
    Sends an email notification with the provided subject and body.
    """
    with smtplib.SMTP("smtp.gmail.com", 587) as connection:
        connection.starttls()
        connection.login(user=mail, password=password)
        msg = MIMEMultipart()
        msg['From'] = mail
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))  # Set content type to plain text
        try:
            connection.sendmail(from_addr=mail, to_addrs=recipient_email, msg=msg)
            print(f"Email sent to {recipient_email}")
        except Exception as e:
            print(f"Error sending email: {e}")

# Loop through alerts and send emails
for alert in collection.find({}):
    recipient_email = alert.get('mail')
    # Assuming 'message' is a field in the alert dictionary containing the email body
    alert_message = alert.get('message')

    if recipient_email and alert_message:  # Check for valid email and message
        send_alert_email(recipient_email, "Alert Notification", alert_message)