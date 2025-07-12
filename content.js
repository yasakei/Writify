console.log("[GrammarFixer] Content script loaded");

document.addEventListener("keydown", async (e) => {
  if (e.ctrlKey && (e.key === "i" || e.key === "I")) {
    const el = document.activeElement;
    console.log("[GrammarFixer] Ctrl+I detected");
    if (
      el &&
      (el.tagName === "TEXTAREA" ||
        (el.tagName === "INPUT" && el.type === "text") ||
        el.isContentEditable)
    ) {
      let originalText;
      if (el.isContentEditable) {
        originalText = el.innerText;
      } else {
        originalText = el.value;
      }
      console.log("[GrammarFixer] Target element found. Original text:", originalText);

      if (!originalText.trim()) {
        console.log("[GrammarFixer] Skipping: text is empty");
        return;
      }

      el.disabled = true;
      el.style.opacity = "0.6";

      try {
        const correctedText = await chrome.runtime.sendMessage({
          type: "fix",
          text: originalText
        });

        if (correctedText) {
          console.log("[GrammarFixer] Corrected text received:", correctedText);
          if (el.isContentEditable) {
            // Try to preserve formatting and selection for contenteditable
            el.focus();
            document.execCommand('selectAll', false, null);
            document.execCommand('insertText', false, correctedText);
          } else {
            el.value = correctedText;
            // For textarea/input, trigger input/change events for frameworks
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }
        } else {
          console.warn("[GrammarFixer] No correction received.");
        }
      } catch (err) {
        console.error("[GrammarFixer] Error sending message to background script:", err);
      }

      el.disabled = false;
      el.style.opacity = "1";
    } else {
      console.warn("[GrammarFixer] Active element is not a valid input, textarea, or contenteditable");
    }
  }
});
