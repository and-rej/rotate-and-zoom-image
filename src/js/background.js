'use strict';

const messageSender = new MessageSender();

{
    const rotateContextMenu = new ContextMenu({
        title: browser.i18n.getMessage('rotateImage'),
        contexts: ['image', 'link'],
    }, messageSender);

    [-90, -180, 90, 180].forEach((deg) => rotateContextMenu.addRotateChild(deg));
    rotateContextMenu.addResetChild('rotate');
}

{
    const zoomContextMenu = new ContextMenu({
        title: browser.i18n.getMessage('zoomImage'),
        contexts: ['image', 'link'],
    }, messageSender);

    [25, 50, 75, 125, 150, 200, 300, 400, 500].forEach((percent) => zoomContextMenu.addZoomChild(percent));
    zoomContextMenu.addResetChild('zoom');
}

{
    const flipContextMenu = new ContextMenu({
        title: browser.i18n.getMessage('flipImage'),
        contexts: ['image', 'link'],
    }, messageSender);

    ['horizontally', 'vertically'].forEach((how) => flipContextMenu.addFlipChild(how));
    flipContextMenu.addResetChild('flip');
}

new ContextMenu({
    title: browser.i18n.getMessage('resetAllImageTransformations'),
    contexts: ['image', 'link'],
    onclick: function(info, tab) {
        messageSender.resetAllTransformations(tab);
    },
});

new ContextMenu({
    title: browser.i18n.getMessage('openOptions', browser.i18n.getMessage('extensionName')),
    contexts: ['image', 'link'],
    onclick: () => browser.runtime.openOptionsPage(),
});
