chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[GrammarFixer] onMessage fired", message, sender);
  if (message.type === "fix") {
    console.log("[GrammarFixer] Received fix request with text:", message.text);

    (async () => {
      try {
        console.log("[GrammarFixer] Sending fetch to proxy with text:", message.text);
        const res = await fetch("http://localhost:3000/fix", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: message.text })
        });

        console.log("[GrammarFixer] Fetch response status:", res.status);
        const data = await res.json();
        console.log("[GrammarFixer] Proxy API response:", data);

        const output = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        console.log("[GrammarFixer] Output to sendResponse:", output);
        sendResponse(output.trim());
      } catch (err) {
        console.error("[GrammarFixer] Error calling proxy:", err);
        sendResponse(null);
      }
    })();

    return true; // Keep the response channel open for async reply
  }
});
