/*global chrome*/
let isExtensionActive = false;

chrome.action.onClicked.addListener((tab) => {
  isExtensionActive = !isExtensionActive;

  // Update icon
  chrome.action.setIcon({
    path: {
      16: "icons/myall16.png",
      32: "icons/myall32.png",
      192: "icons/myall192.png",
    },
  });

  // Toggle side panel with callback
  chrome.windows.getCurrent(async (window) => {
    if (isExtensionActive) {
      // chrome.sidePanel.setOptions({
      //   enabled: true,
      // })
      // console.log(
      //   "await chrome.sidePanel.path =" + (await chrome.sidePanel.path)
      // );
      chrome.sidePanel.setOptions({
        enabled: true,
      });
      chrome.sidePanel.open({ windowId: window.id });
    } else {
      chrome.sidePanel.setOptions({
        enabled: false,
      });
    }
  });

  // Send message to content script if on valid page
  if (tab?.id && tab.url && !tab.url.startsWith("chrome://")) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["contentScript.js"],
      },
      () => {
        chrome.tabs.sendMessage(tab.id, { isRunning: isExtensionActive });
      }
    );
  }
});
