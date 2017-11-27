function MessageSender() {
}

MessageSender.prototype = {
    _sendMessage: function(tabId, t, v) {
        browser.tabs.sendMessage(tabId, {type: t, value: v});
    },

    rotateImage: function(tab, degrees) {
        this._sendMessage(tab.id, 'rotate', degrees);
    },

    zoomImage: function(tab, percent) {
        this._sendMessage(tab.id, 'zoom', percent);
    },

    flipImage: function(tab, how) {
        switch (how) {
            case 'horizontally':
                this._sendMessage(tab.id, 'flip', {x: -1});
                break;
            case 'vertically':
                this._sendMessage(tab.id, 'flip', {y: -1});
                break;
        }
    },

    resetTransformation: function(tab, transformation) {
        this._sendMessage(tab.id, transformation, null);
    },

    resetAllTransformations: function(tab) {
        this._sendMessage(tab.id, 'reset-all');
    },
};
