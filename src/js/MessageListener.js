function MessageListener(imageContainer) {
    this._container = imageContainer;
}

MessageListener.prototype = {
    receive: function(request) {
        switch (request.type) {
            case 'rotate':
                if (request.value === null) {
                    this._container.resetTransformation('rotate');
                } else {
                    this._container.rotateImage(request.value);
                }
                break;
            case 'zoom':
                if (request.value === null) {
                    this._container.resetTransformation('scale');
                } else {
                    this._container.zoomImage(request.value);
                }
                break;
            case 'flip':
                if (request.value === null) {
                    this._container.resetTransformation('scale');
                } else {
                    this._container.flipImage(request.value.x || 1, request.value.y || 1);
                }
                break;
            case 'reset-all':
                this._container.resetAllTransformations();
                break;
        }
    },
};
