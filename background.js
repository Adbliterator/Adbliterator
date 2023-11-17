
let isChrome = chrome.runtime != undefined
let runtime;

if (isChrome) runtime = chrome.runtime;
else runtime = browser.runtime;

const defaultSettings = {
    'uselessytfeatures-enabled': true,
    'adblock-enabled': true,
}

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("SettingsPage/settings.html") });
  });

runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(null, (data) => {
        if (Object.keys(data).length === 0) {
            chrome.storage.local.set(defaultSettings);
            console.log('Configured Default Settings.')
        }
    });
})