function ImageContainer(options) {
    this._image = null;
    this._options = options;
}

ImageContainer.prototype = {
    setImage: function(clickedImage) {
        this._image = clickedImage;
    },

    _setImageTransition: function(transformationCallback) {
        const enabledOptionId = 'transformation_animation_enabled';
        const durationOptionId = 'transformation_animation_duration';
        this._options.get([enabledOptionId, durationOptionId]).then((items) => {
            if (items[enabledOptionId]) {
                this._image.style.transition = `all ${items[durationOptionId]}s`;
            }
            transformationCallback();
            if (items[enabledOptionId]) {
                this._afterTransformation(items[durationOptionId]);
            }
        });
    },

    _resetImageTransition: function() {
        this._image.style.transition = null;
    },

    _doTransformation: function(transformationCallback) {
        this._setImageTransition(transformationCallback);
        const imageTransformations = parseInt(this._image.dataset.numOfTransformations || 0);
        this._image.dataset.numOfTransformations = imageTransformations + 1;
        const highlightOptionId = 'highlight_transformed_images';
        this._options.get([highlightOptionId]).then((items) => {
            if (items[highlightOptionId]) {
                this._image.style.boxShadow = '0 0 0.1em 0.1em';
                this._image.style.zIndex = 999;
            } else {
                this._image.style.boxShadow = null;
                this._image.style.zIndex = null;
            }
        });
    },

    _undoTransformation: function(transformationCallback, numberOfUndoneTransformations) {
        this._setImageTransition(transformationCallback);
        let imageTransformations = parseInt(this._image.dataset.numOfTransformations || 0);
        if (imageTransformations > 0) {
            imageTransformations -= numberOfUndoneTransformations;
            this._image.dataset.numOfTransformations = imageTransformations;
        }
        if (imageTransformations <= 0) {
            this._image.style.boxShadow = null;
            this._image.style.zIndex = null;
        }
    },

    _afterTransformation: function(duration) {
        setTimeout(() => this._resetImageTransition(), duration * 1000);
    },

    rotateImage: function(degrees) {
        this._doTransformation(() =>
            this._image.style.transform = this._image.style.transform + ` rotate(${degrees}deg)`
        );
    },

    zoomImage: function(percent) {
        this._doTransformation(() =>
            this._image.style.transform = this._image.style.transform + ` scale(${percent/100})`
        );
    },

    flipImage: function(sx, sy) {
        this._doTransformation(() =>
            this._image.style.transform = this._image.style.transform + ` scale(${sx}, ${sy})`
        );
    },

    resetTransformation: function(transformation) {
        const transformationRegExp = new RegExp(transformation + '\\((-|\\w|\\.|,|\\s)*\\)', 'gi');
        const matchedTransformations = (this._image.style.transform.match(transformationRegExp) || []).length;
        if (matchedTransformations > 0) {
            this._undoTransformation(
                () => this._image.style.transform = this._image.style.transform.replace(transformationRegExp, '').trim(),
                matchedTransformations
            );
        }
    },

    resetAllTransformations: function() {
        this._undoTransformation(() => this._image.style.transform = null, 9999);
        this._image.dataset.numOfTransformations = 0;
        this._image.style.boxShadow = null;
        this._image.style.zIndex = null;
    },
};
