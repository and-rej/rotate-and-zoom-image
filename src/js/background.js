'use strict';

var messageSender = new MessageSender();

var rotateContextMenu = new ContextMenu({
    title: chrome.i18n.getMessage('rotateImage'),
    contexts: ['image', 'link'],
}, messageSender);

[90, 180, 270].forEach(rotateContextMenu.addRotateChild.bind(rotateContextMenu));
rotateContextMenu.addResetChild('rotate');

var zoomContextMenu = new ContextMenu({
    title: chrome.i18n.getMessage('zoomImage'),
    contexts: ['image', 'link'],
}, messageSender);

[125, 150, 200, 300, 400, 500].forEach(zoomContextMenu.addZoomChild.bind(zoomContextMenu));
zoomContextMenu.addResetChild('zoom');

var resetAllContextMenu = new ContextMenu({
    title: chrome.i18n.getMessage('resetAllImageTransformations'),
    contexts: ['image', 'link'],
    onclick: function(info, tab) {
        messageSender.resetAllTransformations(tab);
    },
});
