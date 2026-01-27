from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from osint.telegram_fetch import init_client, fetch_channel_info, client
from osint.telegram_discovery import discover_public_chats
from osint.risk_engine import calculate_risk
from osint.official_detector import detect_official_account

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# -------------------------------------------------
# Startup: Connect and authorize Telegram session
# -------------------------------------------------
@app.on_event("startup")
async def startup():
    await init_client()

# -------------------------------------------------
# Health Check Endpoint
# -------------------------------------------------
@app.get("/health")
async def health_check():
    health = {
        "status": "ok",
        "telegram": "unknown",
        "risk_engine": "unknown"
    }

    try:
        await client.connect()
        if await client.is_user_authorized():
            health["telegram"] = "connected"
        else:
            health["telegram"] = "not_logged_in"
            health["status"] = "error"
    except Exception as e:
        health["telegram"] = f"error: {str(e)}"
        health["status"] = "error"
    try:
        dummy = {
            "title": "brand support",
            "username": "brand_support",
            "messages": ["verify account"],
            "links": ["http://test.com"],
            "about": "",
            "verified": False,
            "participants": 0
        }
        score, reasons = calculate_risk("brand", dummy)
        if isinstance(score, int) and isinstance(reasons, list):
            health["risk_engine"] = "loaded"
        else:
            health["risk_engine"] = "error"
            health["status"] = "error"
    except:
        health["risk_engine"] = "error"
        health["status"] = "error"

    return health

# -------------------------------------------------
# Main OSINT Scan Endpoint
# -------------------------------------------------
@app.get("/scan/{brand}")
async def scan_brand(brand: str):
    results = []

    tme_links = await discover_public_chats(brand)
    print(f"[TELEGRAM DISCOVERY] {brand} ->", tme_links)

    if not tme_links:
        return []

    for link in tme_links:
        data = await fetch_channel_info(link)
        if not data:
            continue

        risk, risk_reasons = calculate_risk(brand, data)

        is_official, official_confidence, official_reasons = detect_official_account(brand, data)

        if is_official:
            verdict = "Official Legitimate Account"
            risk = 0
        else:
            if risk >= 70:
                verdict = "Likely Impersonation"
            elif risk >= 40:
                verdict = "Suspicious / Needs Review"
            else:
                verdict = "Likely Legitimate"

        results.append({
            "name": data["title"],
            "username": "@" + (data["username"] or ""),
            "risk": risk,
            "verdict": verdict,

            "riskReasons": risk_reasons,

            "officialConfidence": official_confidence,
            "officialReasons": official_reasons,

            "links": data["links"],
            "sampleMessage": data["messages"][0] if data["messages"] else "",
            "image": "https://via.placeholder.com/80",
            "tme": data["tme"]
        })

    results.sort(key=lambda x: x["risk"], reverse=True)
    return results