'use strict';

var options = new Options();
var imageContainer = new ImageContainer(options);

document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName.toLowerCase() == 'img') {
        imageContainer.setImage(e.target);
    } else {
        imageContainer.setImage(null);
    }
}, true);

var messageListener = new MessageListener(imageContainer);

chrome.runtime.onMessage.addListener(messageListener.receive.bind(messageListener));
