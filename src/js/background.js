'use strict';

const messageSender = new MessageSender();
const options = new Options();

{
    const rotateContextMenu = new ContextMenu({
        title: browser.i18n.getMessage('rotateImage'),
        contexts: ['image', 'link'],
    }, messageSender);

    const rotationDegreesOptionId = 'rotation_degrees';
    options.get(rotationDegreesOptionId).then((items) => {
        items[rotationDegreesOptionId]
            .sort((a,b) => {
                if (a < 0 && b < 0) {
                    return -(a-b);
                } else {
                    return (a-b);
                }
            })
            .forEach((deg) => rotateContextMenu.addRotateChild(deg));
        rotateContextMenu.addResetChild('rotate');
    });
}

{
    const zoomContextMenu = new ContextMenu({
        title: browser.i18n.getMessage('zoomImage'),
        contexts: ['image', 'link'],
    }, messageSender);

    const zoomLevelsOptionId = 'zoom_percent_levels';
    options.get(zoomLevelsOptionId).then((items) => {
        items[zoomLevelsOptionId]
            .sort((a,b) => a-b)
            .forEach((percent) => zoomContextMenu.addZoomChild(percent));
        zoomContextMenu.addResetChild('zoom');
    });
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
