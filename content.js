// Locate the parent container where subtitles are nested
const parentContainer = document.querySelector('div[jsname="dsyhDe"]');

let transcript = [];
let lastProcessedText = ""; // Tracks the last complete subtitle text

if (parentContainer) {
  console.log("Parent container for subtitles found!");

  // Use MutationObserver to listen for changes in the parent container
  const observer = new MutationObserver(() => {
    const subtitleDiv = parentContainer.querySelector('div[jsname="tgaKEf"]');
    if (subtitleDiv) {
      // Combine all <span> text inside the subtitle div
      const subtitleText = Array.from(subtitleDiv.querySelectorAll('span'))
        .map(span => span.innerText.trim())
        .join(" ")
        .trim();

      // Capture the speaker's name
      const speakerDiv = parentContainer.querySelector('div.KcIKyf.jxFHg');
      const speakerName = speakerDiv ? speakerDiv.innerText : "Unknown Speaker";

      // Check for new text that hasn't been fully captured
      if (subtitleText && subtitleText !== lastProcessedText) {
        const newText = subtitleText.slice(lastProcessedText.length).trim();
        if (newText) {
          transcript.push({
            timestamp: new Date().toISOString(),
            speaker: speakerName,
            text: newText,
          });
          console.log(`[${speakerName}]: ${newText}`);
        }
        lastProcessedText = subtitleText; // Update the last processed text
      }
    }
  });

  observer.observe(parentContainer, { childList: true, subtree: true });
} else {
  console.error("Parent container for subtitles not found.");
}

// Listen for messages to retrieve the transcript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTranscript") {
    sendResponse({ transcript });
  }
});
