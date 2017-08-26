function ImageContainer(transitionDurationSeconds) {
    this._image = null;
    this._transitionSeconds = transitionDurationSeconds;
}

ImageContainer.prototype = {
    setImage: function(clickedImage) {
        this._image = clickedImage;
    },

    _setImageTransition: function() {
        this._image.style.transition = `all ${this._transitionSeconds}s`;
    },

    _resetImageTransition: function() {
        this._image.style.transition = null;
    },

    _beforeTransformation: function() {
        this._setImageTransition();
    },

    _afterTransformation: function() {
        setTimeout(this._resetImageTransition.bind(this), this._transitionSeconds * 1000);
    },

    rotateImage: function(degrees) {
        this._beforeTransformation();
        this._image.style.transform = this._image.style.transform + ` rotate(${degrees}deg)`;
        this._afterTransformation();
    },

    zoomImage: function(percent) {
        this._beforeTransformation();
        this._image.style.transform = this._image.style.transform + ` scale(${percent/100})`;
        this._afterTransformation();
    },

    resetTransformation: function(transformation) {
        var transformationRegExp = new RegExp(transformation + '\\((\\w|\\.)*\\)', 'gi');
        if ((this._image.style.transform.match(transformationRegExp) || []).length > 0) {
            this._beforeTransformation();
            this._image.style.transform = this._image.style.transform.replace(transformationRegExp, '').trim();
            this._afterTransformation();
        }
    },

    resetAllTransformations: function() {
        this._beforeTransformation();
        this._image.style.transform = null;
        this._afterTransformation();
    },
}
