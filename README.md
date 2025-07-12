# Writify

> **Your AI-powered grammar fixer for Firefox**

---

## ✨ Features
- Instantly fixes grammar in any `<textarea>`, text `<input>`, or `contenteditable` field
- Powered by Google Gemini API (via a local Node.js proxy)
- Fast, private, and easy to use

---

## 🚀 Getting Started

### 1. Get a Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and sign in with your Google account.
- Click **Create API Key** and copy your key.

### 2. Clone this Repository
```sh
git clone https://github.com/yasakei/Writify.git
cd Writify
```

### 3. Save Your API Key
- Create a file named `token` (no extension) in the project root.
- Paste your Gemini API key into this file (the file should contain only the key, no spaces or newlines).

### 4. Install Proxy Dependencies
```sh
npm install
```

### 5. Start the Proxy Server
You can run the proxy manually:
```sh
node proxy.js
```
Or use [PM2](https://pm2.keymetrics.io/) to keep it running in the background:
```sh
npm install -g pm2
npm2 start proxy.js --name writify-proxy
pm2 save
```

### 6. Load the Extension in Firefox
- Open Firefox and go to `about:debugging#/runtime/this-firefox`
- Click **Load Temporary Add-on...**
- Select the `manifest.json` file from this repo

> **Note:** For permanent installation, you must [sign the extension with Mozilla](https://addons.mozilla.org/en-US/developers/), then load the signed `.xpi` via `about:addons`.

---

## 🖱️ Usage
- Focus any text field, textarea, or contenteditable area
- Press **Ctrl+I**
- Your grammar will be fixed automatically!

---

## 🔒 Security & Privacy
- Your text is only sent to the Gemini API via your local proxy.
- Your API key is stored locally in the `token` file and never shared.

---

## 🛠 Troubleshooting
- Make sure the proxy server is running (`node proxy.js` or via PM2)
- Make sure your API key is valid and in the `token` file
- If you see CORS or network errors, check that the proxy is running on `localhost:3000`
- If the extension says "corrupted" when loading, ensure there are no comments in `manifest.json` and you are zipping only the extension files (not the folder)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Made with ❤️ for better writing.</sub>
</p>
