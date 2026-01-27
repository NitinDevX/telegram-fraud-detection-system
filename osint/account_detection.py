def detect_official_account(brand, data):
    brand = brand.lower()
    title = (data["title"] or "").lower()
    username = (data["username"] or "").lower()
    about = (data["about"] or "").lower()

    verified = bool(data.get("verified", False))

    participants = data.get("participants") or 0

    confidence = 0
    reasons = []

    if verified:
        confidence += 50
        reasons.append("Telegram verified badge present")

    if username == brand:
        confidence += 40
        reasons.append("Username exactly matches brand")

    if title == brand:
        confidence += 30
        reasons.append("Title exactly matches brand")

    if brand in about and ("http" in about or "www" in about):
        confidence += 20
        reasons.append("Official website mentioned in description")

    if participants > 10000:
        confidence += 10
        reasons.append("Large subscriber base")

    confidence = min(confidence, 100)
    is_official = confidence >= 70

    return is_official, confidence, reasons