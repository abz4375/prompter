(()=>{
  chrome.tabs.onUpdated.addListener((tabId, tab) => {
      if (tab.url && (tab.url.includes("bard.google.com") )) {
          chrome.tabs.sendMessage(tabId, {
          message: "yes",
        });
      }
    });
})();
