from telethon.tl.functions.contacts import SearchRequest
from osint.telegram_fetch import client

async def discover_public_chats(brand, limit=20):
    try:
        result = await client(SearchRequest(
            q=brand,
            limit=limit
        ))
    except Exception as e:
        print("[TELEGRAM SEARCH ERROR]", e)
        return []

    results = []

    for chat in result.chats:
        username = getattr(chat, "username", None)
        if username:
            results.append(f"https://t.me/{username}")

    return results