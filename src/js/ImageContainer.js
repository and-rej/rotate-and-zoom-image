function ImageContainer(options) {
    this._image = null;
    this._options = options;
}

ImageContainer.prototype = {
    setImage: function(clickedImage) {
        this._image = clickedImage;
    },

    _setImageTransition: function(transformationCallback) {
        const enabledOptionId = 'options.transformation_animation_enabled';
        const durationOptionId = 'options.transformation_animation_duration';
        this._options.get([enabledOptionId, durationOptionId], function(items) {
            if (items[enabledOptionId]) {
                this._image.style.transition = `all ${items[durationOptionId]}s`;
            }
            transformationCallback();
            if (items[enabledOptionId]) {
                this._afterTransformation(items[durationOptionId]);
            }
        }.bind(this));
    },

    _resetImageTransition: function() {
        this._image.style.transition = null;
    },

    _doTransformation: function(transformationCallback) {
        this._setImageTransition(transformationCallback);
    },

    _afterTransformation: function(duration) {
        setTimeout(this._resetImageTransition.bind(this), duration * 1000);
    },

    rotateImage: function(degrees) {
        this._doTransformation(function() {
            this._image.style.transform = this._image.style.transform + ` rotate(${degrees}deg)`;
        }.bind(this));
    },

    zoomImage: function(percent) {
        this._doTransformation(function() {
            this._image.style.transform = this._image.style.transform + ` scale(${percent/100})`;
        }.bind(this));
    },

    resetTransformation: function(transformation) {
        const transformationRegExp = new RegExp(transformation + '\\((\\w|\\.)*\\)', 'gi');
        if ((this._image.style.transform.match(transformationRegExp) || []).length > 0) {
            this._doTransformation(function() {
                this._image.style.transform = this._image.style.transform.replace(transformationRegExp, '').trim();
            }.bind(this));
        }
    },

    resetAllTransformations: function() {
        this._doTransformation(function() {
            this._image.style.transform = null;
        }.bind(this));
    },
};
