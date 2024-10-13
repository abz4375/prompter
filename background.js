function sendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, message).catch(error => {
    console.error(`Error sending message to tab ${tabId}:`, error);
  });
}

// Listen for installation or update of the extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install" || details.reason === "update") {
    // Initialize any default settings or perform first-time setup
    chrome.storage.sync.set({ prompterEnabled: true, "prompter.abz4375.isOn": true }, () => {
      console.log("Prompter enabled by default and initialized");
    });
  }
});

// Optional: Add a context menu item to quickly toggle the prompter
if (chrome.contextMenus) {
  chrome.contextMenus.create({
    id: "togglePrompter",
    title: "Toggle Prompter",
    contexts: ["page"],
    documentUrlPatterns: ["https://gemini.google.com/*"]
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "togglePrompter") {
      chrome.storage.sync.get("prompter.abz4375.isOn", (data) => {
        const newState = !data["prompter.abz4375.isOn"];
        chrome.storage.sync.set({ "prompter.abz4375.isOn": newState }, () => {
          const message = newState ? "turnOn" : "turnOff";
          sendMessage(tab.id, { message: message });
        });
      });
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes("gemini.google.com")) {
    chrome.storage.sync.get("prompter.abz4375.isOn", (data) => {
      const message = data["prompter.abz4375.isOn"] ? "turnOn" : "turnOff";
      sendMessage(tabId, { message: message });
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get("prompter.abz4375.isOn", (data) => {
    const newState = !data["prompter.abz4375.isOn"];
    chrome.storage.sync.set({ "prompter.abz4375.isOn": newState }, () => {
      const message = newState ? "turnOn" : "turnOff";
      sendMessage(tab.id, { message: message });
    });
  });
});
