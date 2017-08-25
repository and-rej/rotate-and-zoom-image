function rotateImage(tab, deg) {
    chrome.tabs.sendMessage(tab.id, {type: 'rotate', value: deg});
}

chrome.contextMenus.create({
    title: 'Rotate this image',
    id: 'rotate-image',
    contexts: ['image'],
});

chrome.contextMenus.create({
    title: 'Rotate 90°',
    id: 'rotate-image-90',
    parentId: 'rotate-image',
    onclick: function(info, tab) {
        rotateImage(tab, 90);
    },
});

chrome.contextMenus.create({
    title: 'Rotate 180°',
    id: 'rotate-image-180',
    parentId: 'rotate-image',
    onclick: function(info, tab) {
        rotateImage(tab, 180);
    },
});

chrome.contextMenus.create({
    title: 'Rotate 270°',
    id: 'rotate-image-270',
    parentId: 'rotate-image',
    onclick: function(info, tab) {
        rotateImage(tab, 270);
    },
});

chrome.contextMenus.create({
    title: 'Reset',
    id: 'rotate-image-reset',
    parentId: 'rotate-image',
    onclick: function(info, tab) {
        rotateImage(tab, null);
    },
});

function zoomImage(tab, level) {
    chrome.tabs.sendMessage(tab.id, {type: 'zoom', value: level});
}

chrome.contextMenus.create({
    title: 'Zoom this image',
    id: 'zoom-image',
    contexts: ['image'],
});

chrome.contextMenus.create({
    title: 'Zoom 125%',
    id: 'rotate-image-125',
    parentId: 'zoom-image',
    onclick: function(info, tab) {
        zoomImage(tab, 1.25);
    },
});

chrome.contextMenus.create({
    title: 'Zoom 150%',
    id: 'zoom-image-150',
    parentId: 'zoom-image',
    onclick: function(info, tab) {
        zoomImage(tab, 1.5);
    },
});

chrome.contextMenus.create({
    title: 'Zoom 200°',
    id: 'zoom-image-200',
    parentId: 'zoom-image',
    onclick: function(info, tab) {
        zoomImage(tab, 2);
    },
});

chrome.contextMenus.create({
    title: 'Zoom 300°',
    id: 'zoom-image-300',
    parentId: 'zoom-image',
    onclick: function(info, tab) {
        zoomImage(tab, 3);
    },
});

chrome.contextMenus.create({
    title: 'Zoom 400°',
    id: 'zoom-image-400',
    parentId: 'zoom-image',
    onclick: function(info, tab) {
        zoomImage(tab, 4);
    },
});

chrome.contextMenus.create({
    title: 'Zoom 500°',
    id: 'zoom-image-500',
    parentId: 'zoom-image',
    onclick: function(info, tab) {
        zoomImage(tab, 5);
    },
});

chrome.contextMenus.create({
    title: 'Reset',
    id: 'zoom-image-reset',
    parentId: 'zoom-image',
    onclick: function(info, tab) {
        zoomImage(tab, null);
    },
});

function resetImage(tab) {
    chrome.tabs.sendMessage(tab.id, {type: 'reset-all'});
}

chrome.contextMenus.create({
    title: 'Reset all',
    id: 'reset-all',
    contexts: ['image'],
    onclick: function(info, tab) {
        resetImage(tab);
    },
});

