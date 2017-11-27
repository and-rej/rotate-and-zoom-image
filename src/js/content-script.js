'use strict';

const options = new Options();
const imageContainer = new ImageContainer(options);

document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        imageContainer.setImage(e.target);
    } else {
        const img = e.target.querySelector('img');
        if (img) {
            imageContainer.setImage(img);
        } else {
            imageContainer.setImage(null);
        }
    }
}, true);

const messageListener = new MessageListener(imageContainer);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
    messageListener.receive(request, sender, sendResponse)
);
