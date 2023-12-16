# app.py
import os
import eel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

eel.init('.')  # Directory containing the HTML, CSS, and JS files

@eel.expose
def send_email(to_email, subject, body, sender_email, sender_password, file_path):
    message = MIMEMultipart()
    message["From"] = sender_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    # Attach the file to the email
    if file_path and os.path.exists(file_path):
        attachment = open(file_path, "rb")
        base = MIMEBase('application', 'octet-stream')
        base.set_payload(attachment.read())
        encoders.encode_base64(base)
        base.add_header('Content-Disposition', f'attachment; filename={os.path.basename(file_path)}')
        message.attach(base)
        attachment.close()

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, message.as_string())

        return "Email sent successfully!"
    except smtplib.SMTPAuthenticationError:
        return "Failed to authenticate. Please check your credentials."
    except Exception as e:
        return f"An error occurred: {str(e)}"

eel.start('index.html', size=(800, 600), mode='chrome', host='localhost', port=8000)
