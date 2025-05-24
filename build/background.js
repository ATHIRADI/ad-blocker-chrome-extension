chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    adBlockEnabled: true,
  });
  updateAdBlockRules(true);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "toggle-adblock") {
    updateAdBlockRules(message.enabled);
  }
});

function updateAdBlockRules(enabled) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: enabled
      ? [
          {
            id: 1,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "*://*.doubleclick.net/*",
              resourceTypes: ["script", "image", "sub_frame"],
            },
          },
        ]
      : [],
  });
}
