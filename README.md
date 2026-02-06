# Writify

> **Your AI-powered grammar fixer for your browser**

---

## ✨ Features
- Instantly fixes grammar in any `<textarea>`, text `<input>`, or `contenteditable` field (supports rich text editors like Discord/Slack)
- Powered by OpenRouter API (using `arcee-ai/trinity-large-preview:free` model)
- Fast, private, and easy to use

---

## 🚀 Getting Started

### 1. Get an OpenRouter API Key
- Go to [OpenRouter](https://openrouter.ai/) and sign up/sign in.
- Navigate to your keys section and create a new API key.
- (Optional) Verify checking "Free" models like `arcee-ai/trinity-large-preview:free`.

### 2. Clone this Repository
```sh
git clone https://github.com/yasakei/Writify.git
cd Writify
```

### 3. Save Your API Key
- Create a file named `token` (no extension) in the project root.
- Paste your OpenRouter API key into this file (the file should contain only the key, no spaces or newlines).

### 4. Install Proxy Dependencies
```sh
npm install
```

### 5. Start the Proxy Server
You need to run the local proxy to handle API requests securely.
```sh
node proxy.js
```
Or use [PM2](https://pm2.keymetrics.io/) to keep it running in the background:
```sh
npm install -g pm2
pm2 start proxy.js --name writify-proxy
pm2 save
```

### 6. Load the Extension
**Chrome / Edge / Brave:**
- Open `chrome://extensions`
- Enable **Developer mode** (top right)
- Click **Load unpacked**
- Select the folder containing this repository

**Firefox:**
- Open `about:debugging#/runtime/this-firefox`
- Click **Load Temporary Add-on...**
- Select the `manifest.json` file

---

## 🖱️ Usage
1. Click inside any text field, textarea, or chat box.
2. Press **Ctrl+Shift+F**.
3. The extension will briefly disable the input (visual feedback) and replace the text with the corrected version.

---

## 🔒 Security & Privacy
- Your text is sent to the OpenRouter API via your local proxy.
- Your API key is stored locally in the `token` file and never exposed to the browser context.

---

## 🛠 Troubleshooting
- **Nothing happens?** Check if `node proxy.js` is running.
- **Keybinding conflict?** Ensure no other extension is using **Ctrl+Shift+F**.
- **Formatted text lost?** The extension tries to preserve formatting but simple text replacement is most reliable.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
