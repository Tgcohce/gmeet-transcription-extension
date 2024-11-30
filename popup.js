const transcriptContainer = document.getElementById("transcriptContainer");
const downloadButton = document.getElementById("download");

let transcriptData = []; // Local cache of transcript data

// Initialize the popup state
document.addEventListener("DOMContentLoaded", () => {
  // Load stored state
  chrome.storage.local.get(["recording", "transcript"], (data) => {
    const isRecording = data.recording || false;
    transcriptData = data.transcript || [];

    if (isRecording) {
      transcriptContainer.innerHTML = "<p>Recording in progress...</p>";
    } else if (transcriptData.length > 0) {
      const formattedTranscript = transcriptData.map(entry => {
        return `<p><strong>${entry.speaker}:</strong> ${entry.text}</p>`;
      }).join("");
      transcriptContainer.innerHTML = formattedTranscript;
      downloadButton.style.display = "block";
    } else {
      transcriptContainer.innerHTML = "<p>No transcript yet. Start recording!</p>";
    }
  });
});

// Start Recording
document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
    transcriptContainer.innerHTML = "<p>Recording started! Capturing transcript...</p>";
    transcriptData = []; // Reset transcript data
    downloadButton.style.display = "none";

    // Save the recording state
    chrome.storage.local.set({ recording: true, transcript: [] });
  });
});

// Stop Recording
document.getElementById("stop").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getTranscript" }, (response) => {
      if (!response || !response.transcript || response.transcript.length === 0) {
        transcriptContainer.innerHTML = "<p>No transcript captured. Make sure captions are enabled.</p>";
        chrome.storage.local.set({ recording: false });
        return;
      }

      // Store and display the transcript
      transcriptData = response.transcript;
      const formattedTranscript = transcriptData.map(entry => {
        return `<p><strong>${entry.speaker}:</strong> ${entry.text}</p>`;
      }).join("");
      transcriptContainer.innerHTML = formattedTranscript;

      // Show the download button
      downloadButton.style.display = "block";

      // Save the final transcript and stop state
      chrome.storage.local.set({ recording: false, transcript: transcriptData });
    });
  });
});

// Download Transcript
downloadButton.addEventListener("click", () => {
  if (transcriptData.length === 0) {
    alert("No transcript to download.");
    return;
  }

  // Format transcript for .txt file
  const textTranscript = transcriptData.map(entry => {
    return `[${entry.timestamp}] ${entry.speaker}:\n${entry.text}\n`;
  }).join("\n");

  // Create and trigger download
  const blob = new Blob([textTranscript], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transcript.txt";
  a.click();
  URL.revokeObjectURL(url); // Clean up the URL
});
