/*global chrome*/
let isExtensionActive = false;

chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension icon clicked!");
  // Toggle the state
  isExtensionActive = !isExtensionActive;
  console.log(`isExtensionActive: ${isExtensionActive}`);

  // Update the icon based on state
  const iconState = isExtensionActive ? "active" : "inactive";
  await chrome.action.setIcon({
    path: {
      16: "icons/myall16.png",
      32: "icons/myall32.png",
      192: "icons/myall192.png",
    },
  });

  // You can add your start/stop logic here
  if (isExtensionActive) {
    // Start your extension functionality
    chrome.sidePanel.open({ windowId: tab.windowId });
  } else {
    // Stop your extension functionality
    chrome.sidePanel.close({ windowId: tab.windowId });
  }
});
