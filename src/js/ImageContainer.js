class ImageContainer {

	constructor(options) {
		this._image = null;
		this._options = options;

		// Track transformation state.
		this._scale = 1;
		this._degreesOfRotation = 0;
		this._orientation = "up";
		this._isFlipped = false;
	}

	setImage(clickedImage) {
		this._image = clickedImage;
	}

	_setImageTransition(transformationCallback) {
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
	}

	_resetImageTransition() {
		this._image.style.transition = null;

		/*
		 * Detect if image has been transformed outside of the top or left edge of the view port.
		 * The browser will not provide scroll bars in this scenario.
		 * If detected then translate the image back into view.
		 */

		// Cannot currently handle flipped images.
		if (this._isFlipped) {
			return;
		}

		const actualX = this._image.getBoundingClientRect().x;
		const actualY = this._image.getBoundingClientRect().y;
		console.debug(`Actual X: ${actualX} Actual Y: ${actualY}`);
		if (actualX < 0 || actualY < 0) {

			// Check if top left is out of view and by how many pixels.
			const xToMove = actualX < 0 ? actualX * -1 : 0;
			const yToMove = actualY < 0 ? actualY * -1 : 0;
			console.debug(`X To Move: ${xToMove} Y To Move: ${yToMove}`);

			// Consider CSS transform scale to make sure image is moved correct distance.
			// Cieling helps it move enough and not trigger another move.
			const xToMoveScaled = Math.ceil(xToMove / this._scale);
			const yToMoveScaled = Math.ceil(yToMove / this._scale);
			console.debug(`X To Move Scaled: ${xToMoveScaled} Y To Move Scaled: ${yToMoveScaled}`);

			// Consider CSS transform rotation to ensure image is moved in correct direction.
			switch (this._orientation) {
				case "up": {
					this.translateImage(xToMoveScaled, yToMoveScaled);
					break;
				}

				case "right": {
					const rotatedXToMoveScaled = yToMoveScaled;
					const rotatedYToMoveScaled = xToMoveScaled * -1;
					this.translateImage(rotatedXToMoveScaled, rotatedYToMoveScaled);
					break;
				}

				case "down": {
					const rotatedXToMoveScaled = xToMoveScaled * -1;
					const rotatedYToMoveScaled = yToMoveScaled * -1;
					this.translateImage(rotatedXToMoveScaled, rotatedYToMoveScaled);
					break;
				}

				case "left":
					const rotatedXToMoveScaled = yToMoveScaled * -1;
					const rotatedYToMoveScaled = xToMoveScaled;
					this.translateImage(rotatedXToMoveScaled, rotatedYToMoveScaled);
					break;
			}
		}
	}

	_doTransformation(transformationCallback) {
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
	}

	_undoTransformation(transformationCallback, numberOfUndoneTransformations) {
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
	}

	_afterTransformation(duration) {
		setTimeout(() => this._resetImageTransition(), duration * 1000);
	}

	rotateImage(degrees) {
		this._doTransformation(() => {
			this._image.style.transform = this._image.style.transform + ` rotate(${degrees}deg)`;

			// Update rotation state.
			this._degreesOfRotation += degrees;
			const degreesFloored = this._degreesOfRotation % 360;
			switch (degreesFloored) {
				case 0:
					this._orientation = "up";
					break;

				case 90:
				case -270:
					this._orientation = "right";
					break;

				case 180:
				case -180:
					this._orientation = "down";
					break;

				case 270:
				case -90:
					this._orientation = "left";
			}
		});
	}

	zoomImage(percent) {
		this._doTransformation(() => {
			this._image.style.transform = this._image.style.transform + ` scale(${percent / 100})`;

			// Update scale state.
			const deltaScale = percent / 100;
			this._scale *= deltaScale;
			console.debug(`Scale ${this._scale}`);
		});
	}

	flipImage(sx, sy) {
		this._doTransformation(() => {
			this._image.style.transform = this._image.style.transform + ` scale(${sx}, ${sy})`;

			// Update flip state.
			this._isFlipped = true;
		});
	}

	translateImage(x, y) {
		this._doTransformation(() =>
			this._image.style.transform = this._image.style.transform + ` translate(${x}px, ${y}px)`
		);
	}

	resetTransformation(transformation) {
		const transformationRegExp = new RegExp(transformation + '\\((-|\\w|\\.|,|\\s)*\\)', 'gi');
		const translateRegExp = new RegExp('translate\\((-|\\w|\\.|,|\\s)*\\)', 'gi');
		const matchedTransformations = (this._image.style.transform.match(transformationRegExp) || []).length;
		if (matchedTransformations > 0) {
			this._undoTransformation(
				() => {
					this._image.style.transform = this._image.style.transform.replace(transformationRegExp, '').trim();

					// Explicitly reset translations and let them recalculate.
					this._image.style.transform = this._image.style.transform.replace(translateRegExp, '').trim();

					// Reset CSS transform state.
					switch (transformation) {
						case "rotate":
							this._degreesOfRotation = 0;
							this._orientation = "up";
							break;

						case "scale":
							this._scale = 1;
							this._isFlipped = false;
							break;
					}
				},
				matchedTransformations);
		}
	}

	resetAllTransformations() {
		this._undoTransformation(() => this._image.style.transform = null, 9999);
		this._image.dataset.numOfTransformations = 0;
		this._image.style.boxShadow = null;
		this._image.style.zIndex = null;

		this._degreesOfRotation = 0;
		this._orientation = "up";
		this._scale = 1;
		this._isFlipped = false;
	}
}
