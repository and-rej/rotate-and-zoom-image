var transitionDurationSeconds = 0.5;
var clickedImage = null;

document.addEventListener('contextmenu', function(e){
    if (e.target.tagName.toLowerCase() == 'img') {
        clickedImage = e.target;
    } else {
        clickedImage = null;
    }
}, true);

function resetTransformFunction(functionName) {
    var functionRegExp = new RegExp(functionName + '\\((\\w|\\.)*\\)', 'gi');
    while ((clickedImage.style.transform.match(functionRegExp) || []).length > 0) {
        clickedImage.style.transform = clickedImage.style.transform.replace(functionRegExp, '').trim();
    }
}

function setRotation(value) {
    clickedImage.style.transform = clickedImage.style.transform + ` rotate(${value}deg)`;
}

function setZoom(value) {
    clickedImage.style.transform = clickedImage.style.transform + ` scale(${value})`;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    clickedImage.style.transition = `all ${transitionDurationSeconds}s`;
    switch (request.type) {
        case 'rotate':
            if (request.value == null) {
                resetTransformFunction('rotate');
            } else {
                setRotation(request.value);
            }
            break;
        case 'zoom':
            if (request.value == null) {
                resetTransformFunction('scale');
            } else {
                setZoom(request.value);
            }
            break;
        case 'reset-all':
            clickedImage.style.transform = null;
            break;
    }
    setTimeout(function(){
        clickedImage.style.transition = null;
    }, transitionDurationSeconds * 1000);
});

