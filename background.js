chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("https://meet.google.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  } else {
    console.log("Not a Google Meet page.");
  }
});
