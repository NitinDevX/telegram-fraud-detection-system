def calculate_risk(brand, data):
    brand = brand.lower()
    title = data["title"].lower()
    username = (data["username"] or "").lower()
    messages = " ".join(data["messages"]).lower()
    links = data["links"]

    score = 0
    reasons = []

    if brand in title:
        score += 30
        reasons.append("Brand name present in channel title")

    if brand in username:
        score += 30
        reasons.append("Brand name present in username")

    suspicious_words = [
        "support", "help", "official", "verify", "kyc",
        "profit", "earn", "investment", "task", "review",
        "double", "pay", "money"
    ]

    found_words = [w for w in suspicious_words if w in title or w in messages]
    if found_words:
        score += 30
        reasons.append(f"Suspicious keywords detected: {', '.join(found_words[:3])}")

    if links:
        score += 20
        reasons.append("External links detected in messages")

    legit_indicators = ["news", "updates", "blog", "official"]

    if any(word in title for word in legit_indicators) and not found_words:
        score -= 40
        reasons.append("Looks like official or news-style channel")

    score = max(0, min(score, 100))

    return score, reasons