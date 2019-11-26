class MessageSender {

    _sendMessage(tabId, t, v) {
        browser.tabs.sendMessage(tabId, {type: t, value: v});
    }

    rotateImage(tab, degrees) {
        this._sendMessage(tab.id, 'rotate', degrees);
    }

    zoomImage(tab, percent) {
        this._sendMessage(tab.id, 'zoom', percent);
    }

    flipImage(tab, how) {
        switch (how) {
            case 'horizontally':
                this._sendMessage(tab.id, 'flip', {x: -1});
                break;
            case 'vertically':
                this._sendMessage(tab.id, 'flip', {y: -1});
                break;
        }
    }

    resetTransformation(tab, transformation) {
        this._sendMessage(tab.id, transformation, null);
    }

    resetAllTransformations(tab) {
        this._sendMessage(tab.id, 'reset-all');
    }
}
