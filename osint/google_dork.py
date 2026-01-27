import requests
from bs4 import BeautifulSoup
import re
import urllib.parse

def google_search_tme(brand, limit=20):
    
    query = f"site:t.me {brand}"
    url = "https://duckduckgo.com/html/?q=" + urllib.parse.quote(query)

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    res = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(res.text, "html.parser")

    links = set()

    for a in soup.find_all("a", class_="result__a"):
        href = a.get("href", "")
        match = re.search(r"(https://t\.me/[A-Za-z0-9_]+)", href)
        if match:
            links.add(match.group(1))

    return list(links)[:limit]