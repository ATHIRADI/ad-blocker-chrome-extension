const knownAdSelector = [
  'iframe[src*="doubleclick.net"]',
  'iframe[src*="ads"]',
  'div[id^="ad_"]',
  'div[class*="sponsor"]',
  '[class*="ad-banner"]',
  '[class="ytp-ad-module"]',
  '[id="player-ads"]',
  "ytd-promoted-sparkles-web-renderer",
  "ytd-display-ad-renderer",
];

function removeAds() {
  knownAdSelector.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });
}

if (typeof chrome !== "undefined" && chrome.storage) {
  chrome.storage.sync.get(["adBlockEnabled"], (result) => {
    const isEnabled = result.adBlockEnabled ?? true;
    if (isEnabled) {
      removeAds();
      const observer = new MutationObserver(removeAds);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  });
} else {
  removeAds();
  const observer = new MutationObserver(removeAds);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
