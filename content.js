console.log("[GrammarFixer] Content script loaded");

document.addEventListener("keydown", async (e) => {
  // Check for Ctrl+Shift+F
  if (e.ctrlKey && e.shiftKey && (e.code === "KeyF" || e.key === "f" || e.key === "F")) {
    e.preventDefault(); // Prevent default browser/site action
    const el = document.activeElement;
    console.log("[GrammarFixer] Ctrl+Shift+F detected on element:", el);
    
    if (
      el &&
      (el.tagName === "TEXTAREA" ||
        (el.tagName === "INPUT" && el.type === "text") ||
        el.isContentEditable)
    ) {
      // Visual feedback
      const originalOpacity = el.style.opacity;
      const originalCursor = el.style.cursor;
      el.style.opacity = "0.6";
      el.style.cursor = "wait";
      
      let originalText;
      if (el.isContentEditable) {
        originalText = el.innerText;
        // Don't disable contentEditable as it breaks some editors (e.g. Slate/Discord)
      } else {
        originalText = el.value;
        el.disabled = true; // Disable input
      }

      try {
        const correctedText = await chrome.runtime.sendMessage({
          type: "fix",
          text: originalText
        });

        if (correctedText) {
          console.log("[GrammarFixer] Corrected text received:", correctedText);
          if (el.isContentEditable) {
            el.focus();
            // Use Range API for more reliable selection
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            
            // Try standard insertText command first
            if (!document.execCommand('insertText', false, correctedText)) {
               // Fallback for tricky editors
               console.log("[GrammarFixer] execCommand failed, trying manual replacement");
               el.innerText = correctedText;
               el.dispatchEvent(new Event('input', { bubbles: true }));
            }
          } else {
            el.disabled = false; // Re-enable
            el.value = correctedText;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }
        } else {
          console.warn("[GrammarFixer] No correction received.");
          if (!el.isContentEditable) el.disabled = false;
        }
      } catch (err) {
        console.error("[GrammarFixer] Error:", err);
        if (!el.isContentEditable) el.disabled = false;
      } finally {
        // Restore styles
        el.style.opacity = originalOpacity || "";
        el.style.cursor = originalCursor || "";
      }
    } else {
      console.warn("[GrammarFixer] Active element is not a valid input, textarea, or contenteditable");
    }
  }
});
