# LinkCleaner

A privacy-focused Chrome Extension built with **JavaScript** and **Manifest V3** that sanitizes URLs by stripping tracking parameters before they are copied to the clipboard.

## 🚀 Features
- **Whitelist Filtering**: Automatically removes all non-essential query parameters (e.g., `utm_*`, `fbclid`, `si`).
- **Amazon Surgical Clean**: Recursively extracts the actual product path from messy `sspa/click` sponsored links.
- **YouTube Optimization**: Strips playlist and tracking data while preserving the video ID (`v`).
- **Real-time Feedback**: Injects a custom toast notification into the webpage DOM to confirm successful cleaning.

## 🛠️ Technical Implementation
- **Manifest V3**: Utilizes Service Workers for background logic and the `scripting` API for safe DOM injection.
- **URL API**: Leverages the native JavaScript `URL` and `URLSearchParams` interfaces for robust parsing.
- **Regex Parsing**: Implements regular expressions to prune tracking artifacts from Amazon's URL paths (e.g., `/ref=...`).

## 📦 Installation
1. Clone this repository.
2. Navigate to `chrome://extensions/` in Chrome.
3. Enable **Developer Mode** (top right).
4. Click **Load Unpacked** and select this project folder.
