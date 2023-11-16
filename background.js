
let isChrome = chrome.runtime != undefined
let runtime;

if (isChrome) runtime = chrome.runtime;
else runtime = browser.runtime;

const defaultSettings = {
    'uselessytfeatures-enabled': true,
    'allowytads-enabled': false,
}

runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(null, (data) => {
        if (Object.keys(data).length === 0) {
            chrome.storage.local.set(defaultSettings);
            console.log('Configured Default Settings.')
        }
    });
})