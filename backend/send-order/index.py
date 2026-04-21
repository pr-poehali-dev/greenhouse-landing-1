import json
import smtplib
import os
# v3
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта теплиц на почту igrusha2211@yandex.ru"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")

    name = body.get("name", "—")
    phone = body.get("phone", "—")
    email = body.get("email", "—")
    length = body.get("length", "—")
    width = body.get("width", "—")
    height = body.get("height", "—")
    region = body.get("region", "—")
    install = body.get("install", "—")
    budget = body.get("budget", "—")

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #2d2d2d; max-width: 600px;">
      <h2 style="color: #4a7c3f; border-bottom: 2px solid #e8dfc8; padding-bottom: 8px;">
        🌱 Новая заявка с сайта ЭкоТеплица
      </h2>

      <h3 style="color: #5a4a2a;">Контактные данные</h3>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:6px 0; color:#888; width:160px;">Имя</td><td style="padding:6px 0;"><b>{name}</b></td></tr>
        <tr><td style="padding:6px 0; color:#888;">Телефон</td><td style="padding:6px 0;"><b>{phone}</b></td></tr>
        <tr><td style="padding:6px 0; color:#888;">Email</td><td style="padding:6px 0;">{email}</td></tr>
      </table>

      <h3 style="color: #5a4a2a; margin-top: 20px;">Параметры теплицы</h3>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:6px 0; color:#888; width:160px;">Длина</td><td style="padding:6px 0;">{length} м</td></tr>
        <tr><td style="padding:6px 0; color:#888;">Ширина</td><td style="padding:6px 0;">{width} м</td></tr>
        <tr><td style="padding:6px 0; color:#888;">Высота</td><td style="padding:6px 0;">{height} м</td></tr>
      </table>

      <h3 style="color: #5a4a2a; margin-top: 20px;">Доставка и бюджет</h3>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:6px 0; color:#888; width:160px;">Регион</td><td style="padding:6px 0;">{region}</td></tr>
        <tr><td style="padding:6px 0; color:#888;">Установка</td><td style="padding:6px 0;">{install}</td></tr>
        <tr><td style="padding:6px 0; color:#888;">Бюджет</td><td style="padding:6px 0;"><b>{budget}</b></td></tr>
      </table>

      <p style="margin-top:24px; padding:12px; background:#f5f0e8; border-radius:8px; color:#666; font-size:13px;">
        Заявка получена с сайта ЭкоТеплица
      </p>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name} — {phone}"
    msg["From"] = "igrusha2211@yandex.ru"
    msg["To"] = "igrusha2211@yandex.ru"
    msg.attach(MIMEText(html, "html", "utf-8"))

    smtp_password = os.environ.get("SMTP_PASSWORD", "")

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login("igrusha2211@yandex.ru", smtp_password)
        server.sendmail("igrusha2211@yandex.ru", "igrusha2211@yandex.ru", msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }