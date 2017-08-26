'use strict';

var messageSender = new MessageSender();

var rotateContextMenu = new ContextMenu({
    title: chrome.i18n.getMessage('rotateImage'),
    id: 'rotate-image',
    contexts: ['image'],
}, messageSender);

[90, 180, 270].forEach(rotateContextMenu.addRotateChild.bind(rotateContextMenu));
rotateContextMenu.addResetChild('rotate');

var zoomContextMenu = new ContextMenu({
    title: chrome.i18n.getMessage('zoomImage'),
    id: 'zoom-image',
    contexts: ['image'],
}, messageSender);

[125, 150, 200, 300, 400, 500].forEach(zoomContextMenu.addZoomChild.bind(zoomContextMenu));
zoomContextMenu.addResetChild('zoom');

var resetAllContextMenu = new ContextMenu({
    title: chrome.i18n.getMessage('resetAllImageTransformations'),
    id: 'reset-all',
    contexts: ['image'],
    onclick: function(info, tab) {
        messageSender.resetAllTransformations(tab);
    },
});
