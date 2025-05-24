import { useEffect, useState } from "react";

function App() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.get(["adBlockEnabled"], (result) => {
        setEnabled(result.adBlockEnabled ?? true);
      });
    } else {
      console.warn(
        "chrome.storage is not available (propably not running inside extension)"
      );
    }
  }, []);

  const toggleAdBlock = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set({ adBlockEnabled: newState }, () => {
        chrome.runtime.sendMessage({
          type: "toggle-adblock",
          enabled: newState,
        });
      });
    }
  };
  const relaodTab = () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
      });
    }
  };

  return (
    <div className="w-[300px] h-[200px] bg-gray-200 p-5">
      <h1 className="text-lg font-semibold">Ad Blocker</h1>
      <label htmlFor="input" className="flex items-center my-4 gap-2">
        <input
          type="checkbox"
          id="input"
          checked={enabled}
          onChange={toggleAdBlock}
        />
        Enable Ad Blocker
      </label>
      <button
        id="relaodTab"
        onClick={relaodTab}
        className="my-4 px-3 cursor-pointer py-1 hover:bg-blue-400 bg-blue-600 text-white transition duration-300"
      >
        Reload Tab
      </button>
    </div>
  );
}

export default App;
