
# Telegram Impersonation Detection System

A Python-based backend designed to hunt for brand impersonation and phishing channels on Telegram. It uses a weighted scoring system to separate official entities from high-risk scams.

## 🛠 Project Structure

* **`server.py`**: The FastAPI entry point; coordinates discovery, fetching, and risk assessment.
* **`osint/telegram_fetch.py`**: Handles the Telethon client connection and scrapes channel metadata/messages.
* **`osint/telegram_discovery.py`**: Searches the Telegram global directory for the brand query.
* **`osint/risk_engine.py`**: Calculates a 0-100 risk score based on content, keywords, and links.
* **`osint/official_detector.py`**: A confidence-based logic for identifying legitimate brand assets.
* **`osint/google_dork.py`**: Scrapes search engines for external `t.me` links.

---

## 🚦 Logic & Scoring

### Risk Engine (`risk_engine.py`)

The engine looks for "Red Flags" in titles and messages:

* **Keywords**: Triggers on terms like `support`, `verify`, `investment`, or `pay`.
* **Patterns**: Penalizes channels using the brand name in the title/username without being verified.
* **Links**: Flags any external URL presence in recent messages.

### Official Detection (`account_detection.py`)

To prevent false positives, we check for:

* **Verified Badge**: Instant +50 confidence.
* **Metadata**: Matches between the brand name and the username or title.
* **Links**: Presence of the brand's official domain in the "About" section.

---

## 🚀 Getting Started

### 1. Requirements

* Python 3.8+
* FastAPI / Uvicorn
* Telethon
* BeautifulSoup4

### 2. Environment Setup

You **must** have a `.env` file in the root directory with your Telegram API credentials:

```env
API_ID=12345
API_HASH=your_api_hash_here
SESSION_NAME=brand_scanner

```

### 3. Running the Server

```bash
uvicorn server:app --reload

```

*On first run, check your terminal to enter the Telegram SMS code for authentication.*

---

## 📡 API Endpoints

### `GET /scan/{brand}`

The main workflow:

1. Discovers public chats via Telegram search.
2. Fetches the last 20 messages and entity details for each result.
3. Runs the risk and official detection algorithms.
4. Returns a sorted list from highest risk to lowest.

### `GET /health`

Returns the status of the Telegram session and verifies the risk engine is loaded.

---
