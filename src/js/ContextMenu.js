function ContextMenu(createProperties, messageSender) {
    this._id = chrome.contextMenus.create(createProperties);
    this._sender = messageSender;
}

ContextMenu.prototype = {
    _addChild: function(createProperties) {
        const childProperties = createProperties;
        childProperties.parentId = this._id;
        return new ContextMenu(childProperties);
    },

    addRotateChild: function(degrees) {
        return this._addChild({
            title: chrome.i18n.getMessage('rotateImageBy', degrees),
            onclick: (info, tab) => this._sender.rotateImage(tab, degrees),
        });
    },

    addZoomChild: function(percent) {
        return this._addChild({
            title: chrome.i18n.getMessage('zoomImageTo', percent),
            onclick: (info, tab) => this._sender.zoomImage(tab, percent),
        });
    },

    addResetChild: function(transformation) {
        return this._addChild({
            title: chrome.i18n.getMessage('resetImageTransformation'),
            onclick: (info, tab) => this._sender.resetTransformation(tab, transformation),
        });
    },
};
