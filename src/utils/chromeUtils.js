/* global chrome */

export const openUrl = async (url) => {
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    // Update current tab URL
    await chrome.tabs.update(tab.id, { url });
  } catch (error) {
    console.error("Error opening URL:", error);
  }
};

export const queryCurrentUrl = async () => {
  console.log("===== handleGrabUrl ======");
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log("queryUrl: Current URL:", tab.url);
    return tab.url;
    // Do something with tab.url
  } catch (error) {
    console.error("Error getting URL:", error);
  }
};

export const getSiteName = (url) => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace("www.", "").split(".")[0];
  } catch (error) {
    return url;
  }
};

export const getSiteDocTitle = async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Check if we can access this tab
    if (
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://")
    ) {
      return tab.title || ""; // Use tab.title as fallback for restricted pages
    }

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.title,
    });
    return result;
  } catch (error) {
    console.error("Error getting site title:", error);
    return ""; // Return empty string on error
  }
};

export const getSiteTitle = async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab.title || getSiteName(tab.url) || "";
  } catch (error) {
    console.error("Error getting site title:", error);
    return "";
  }
};
