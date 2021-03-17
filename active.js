function modifyDOM() {
    container = document.getElementsByClassName('container')[0];

    container.style.width = '99%';

    return 'document.body.innerHTML';
}

function updateIcon() {
    isActive = localStorage.getItem('isActive');
    if (isActive == 'true') {
        localStorage.setItem('isActive', false);
        isActive = false;
        chrome.browserAction.setIcon({
            path: '/imgs/tokocrypto-off.png',
        });
        chrome.browserAction.setTitle({
            title: 'TokoCrypto Expand is OFF',
        });
    } else {
        localStorage.setItem('isActive', true);
        isActive = true;
        chrome.browserAction.setIcon({
            path: '/imgs/tokocrypto-on.png',
        });
        chrome.browserAction.setTitle({
            title: 'TokoCrypto Expand is ON',
        });
    }
}

updateIcon();

function modifyDOM() {
    container = document.getElementsByClassName('container')[0];

    isTokocrypto = /^https?:\/\/([a-zA-Z\d-]+\.){0,}tokocrypto\.com\/*/.test(document.URL);

    if (checked && isTokocrypto) {
        setTimeout(() => {
            container.style.width = '99%';
        }, 250);
    } else {
        container.style.width = '1366px';
    }

    return 'document.body.innerHTML';
}

var excludedlinks = [];

chrome.browserAction.onClicked.addListener(function (tab) {
    if (excludedlinks.includes(tab.url)) {
        return;
    }

    updateIcon();
    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    ch = isActive;
    chrome.tabs.executeScript(
        null,
        {
            code: 'var checked =   ' + ch + ';', //argument here is a string but function.toString() returns function's code
        },
        () => {
            chrome.tabs.executeScript(
                {
                    code: '(' + modifyDOM + ')();', //argument here is a string but function.toString() returns function's code
                },
                (results) => {}
            );
        }
    );
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    isActive = localStorage.getItem('isActive');
    if (message.data.type == 'getStatus');
    {
        sendResponse({ isActive: isActive, excludedlinks: excludedlinks });
    }
    if (message.data.type == 'setStatus') {
        localStorage.setItem('isActive', message.data.isActive);
        isActive = localStorage.getItem('isActive');
    }
});
