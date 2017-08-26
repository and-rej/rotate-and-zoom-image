'use strict';

var imageContainer = new ImageContainer(0.5);

document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName.toLowerCase() == 'img') {
        imageContainer.setImage(e.target);
    } else {
        imageContainer.setImage(null);
    }
}, true);

var messageListener = new MessageListener(imageContainer);

chrome.runtime.onMessage.addListener(messageListener.receive.bind(messageListener));
