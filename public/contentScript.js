// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message:", message);
  if (message.isRunning !== undefined) {
    // You can add any additional page-specific logic here
    // that should happen when the panel is opened/closed
    console.log("Extension is now:", message.isRunning ? "running" : "stopped");
  }
  return true;
});
