function ContextMenu(createProperties, messageSender) {
    this._id = chrome.contextMenus.create(createProperties);
    this._sender = messageSender;
}

ContextMenu.prototype = {
    _addChild: function(createProperties) {
        var childProperties = createProperties;
        childProperties.parentId = this._id;
        return new ContextMenu(childProperties);
    },

    addRotateChild: function(degrees) {
        return this._addChild({
            title: chrome.i18n.getMessage('rotateImageBy', degrees),
            onclick: function(info, tab) {
                this._sender.rotateImage(tab, degrees);
            }.bind(this),
        });
    },

    addZoomChild: function(percent) {
        return this._addChild({
            title: chrome.i18n.getMessage('zoomImageTo', percent),
            onclick: function(info, tab) {
                this._sender.zoomImage(tab, percent);
            }.bind(this),
        });
    },

    addResetChild: function(transformation) {
        return this._addChild({
            title: chrome.i18n.getMessage('resetImageTransformation'),
            onclick: function(info, tab) {
                this._sender.resetTransformation(tab, transformation);
            }.bind(this),
        });
    },
}
