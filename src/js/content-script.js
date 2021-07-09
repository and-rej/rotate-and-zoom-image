'use strict';

// Initialize components.
const options = new Options();
const imageContainer = new ImageContainer(options);
const messageListener = new MessageListener(imageContainer);

// Set image on context menu.
document.addEventListener('contextmenu', (e) => {
	if (e.target.tagName.toLowerCase() === 'img') {
		imageContainer.setImage(e.target);
	} else {
		const img = e.target.querySelector('img');
		if (img) {
			imageContainer.setImage(img);
		} else {
			imageContainer.setImage(null);
		}
	}
}, true);

// Set up messaging between content and background scripts.
browser.runtime.onMessage.addListener((request, sender, sendResponse) =>
	messageListener.receive(request, sender, sendResponse)
);
