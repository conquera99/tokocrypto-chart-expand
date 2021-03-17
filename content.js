chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
});

var excludedlinks = [];
chrome.runtime.sendMessage({ data: { type: 'getStatus' } }, function (response) {
    excludedlinks = response.excludedlinks;
    if (response.isActive == 'true') {
        modifyDOM();
    }
});

function modifyDOM() {
    if (excludedlinks.includes(document.URL)) {
        return;
    }

    container = document.getElementsByClassName('container')[0];

    container.style.width = '99%';

    return 'document.body.innerHTML';
}
