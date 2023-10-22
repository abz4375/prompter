let tabUrl =``;
let tabIdGlobal = null;

const sendMessageExt = async (message,tabID) => {
  chrome.tabs.sendMessage(tabID, {
    message: message,
    tab:tabID
  });
}

chrome.runtime.onMessage.addListener((obj) => {
  const { message, tab } = obj;
  
  // chrome.tabs.sendMessage(tabIdGlobal, {
  //   message: "recieved: "+message,
  // });

  if(message==="Reloaded"){
    if (tabUrl && (tabUrl.includes("bard.google.com") )) {
    //   chrome.tabs.sendMessage(tabIdGlobal, {
    //   message: "yes",
    //   tab:tabIdGlobal
    // });
    sendMessageExt("Reloaded message from background",tab);
  }
  }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {

  // sendMessage("URL updated");

  tabUrl = tab.url;
  tabIdGlobal = tabId;

    if (tab.url && (tab.url.includes("bard.google.com") )) {
      //   chrome.tabs.sendMessage(tabId, {
      //   message: "yes",
      //   tab:tabIdGlobal
      // });
      sendMessageExt("yes",tabId);
    }
  });
