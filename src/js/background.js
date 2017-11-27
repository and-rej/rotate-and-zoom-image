'use strict';

const messageSender = new MessageSender();

const rotateContextMenu = new ContextMenu({
    title: browser.i18n.getMessage('rotateImage'),
    contexts: ['image', 'link'],
}, messageSender);

[90, 180, 270].forEach((deg) => rotateContextMenu.addRotateChild(deg));
rotateContextMenu.addResetChild('rotate');

const zoomContextMenu = new ContextMenu({
    title: browser.i18n.getMessage('zoomImage'),
    contexts: ['image', 'link'],
}, messageSender);

[125, 150, 200, 300, 400, 500].forEach((percent) => zoomContextMenu.addZoomChild(percent));
zoomContextMenu.addResetChild('zoom');

const resetAllContextMenu = new ContextMenu({
    title: browser.i18n.getMessage('resetAllImageTransformations'),
    contexts: ['image', 'link'],
    onclick: function(info, tab) {
        messageSender.resetAllTransformations(tab);
    },
});
