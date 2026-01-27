from telethon import TelegramClient
from telethon.tl.functions.messages import GetHistoryRequest
import os
from dotenv import load_dotenv
import re

load_dotenv()

api_id = int(os.getenv("API_ID"))
api_hash = os.getenv("API_HASH")
session_name = os.getenv("SESSION_NAME")

client = TelegramClient(session_name, api_id, api_hash)

async def init_client():
    await client.connect()
    if not await client.is_user_authorized():
        print("\n[!] Telegram login required.")
        print("Enter your phone number and code in terminal.\n")
        await client.start()

async def fetch_channel_info(tme_link):
    username = tme_link.replace("https://t.me/", "").replace("/", "")

    try:
        entity = await client.get_entity(username)
    except Exception as e:
        print("[FETCH ERROR]", e)
        return None

    title = getattr(entity, "title", "")
    username = getattr(entity, "username", "")
    about = getattr(entity, "about", "")
    verified = getattr(entity, "verified", False)
    participants = getattr(entity, "participants_count", 0)

    history = await client(GetHistoryRequest(
        peer=entity,
        limit=20,
        offset_date=None,
        offset_id=0,
        max_id=0,
        min_id=0,
        add_offset=0,
        hash=0
    ))

    messages = []
    links = []

    for msg in history.messages:
        if msg.message:
            messages.append(msg.message)
            found = re.findall(r'https?://\S+', msg.message)
            links.extend(found)

    return {
        "title": title,
        "username": username,
        "about": about,
        "verified": verified,
        "participants": participants,
        "messages": messages,
        "links": links,
        "tme": tme_link
    }