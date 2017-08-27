'use-strict';

var options = new Options();
var inputs = document.querySelectorAll('input');

for (element of document.querySelectorAll('[data-l10n-id]')) {
    element.textContent = chrome.i18n.getMessage(element.dataset.l10nId);
}

inputs.forEach(options.loadDefault.bind(options));
options.loadAllFromLocalStorage();
for (input of inputs) {
    input.addEventListener('change', options.saveInputOnChange.bind(options));
}
