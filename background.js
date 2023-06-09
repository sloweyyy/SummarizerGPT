chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: 'tomtat',
        title: 'SloWey - Summarizer',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'tomtat') {
        chrome.tabs.sendMessage(tab.id, { text: info.selectionText });
    }
});