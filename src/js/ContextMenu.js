class ContextMenu {

    constructor(createProperties, messageSender) {
        this._id = browser.contextMenus.create(createProperties);
        this._sender = messageSender;
    }

    _addChild(createProperties) {
        const childProperties = createProperties;
        childProperties.parentId = this._id;
        return new ContextMenu(childProperties);
    }

    addRotateChild(degrees) {
        if (degrees > 0) {
            return this._addChild({
                title: browser.i18n.getMessage('rotateImageRightBy', degrees),
                onclick: (info, tab) => this._sender.rotateImage(tab, degrees),
            });
        } else {
            return this._addChild({
                title: browser.i18n.getMessage('rotateImageLeftBy', -degrees),
                onclick: (info, tab) => this._sender.rotateImage(tab, degrees),
            });
        }
    }

    addZoomChild(percent) {
        if (percent > 100) {
            return this._addChild({
                title: browser.i18n.getMessage('zoomImageTo', percent),
                onclick: (info, tab) => this._sender.zoomImage(tab, percent),
            });
        } else {
            return this._addChild({
                title: browser.i18n.getMessage('downscaleImageTo', percent),
                onclick: (info, tab) => this._sender.zoomImage(tab, percent),
            });
        }
    }

    addFlipChild(how) {
        switch (how) {
            case 'horizontally':
                return this._addChild({
                    title: browser.i18n.getMessage('flipImageHorizontally'),
                    onclick: (info, tab) => this._sender.flipImage(tab, how),
                });
                break;
            case 'vertically':
                return this._addChild({
                    title: browser.i18n.getMessage('flipImageVertically'),
                    onclick: (info, tab) => this._sender.flipImage(tab, how),
                });
                break;
        }
    }

    addResetChild(transformation) {
        return this._addChild({
            title: browser.i18n.getMessage('resetImageTransformation'),
            onclick: (info, tab) => this._sender.resetTransformation(tab, transformation),
        });
    }
}
