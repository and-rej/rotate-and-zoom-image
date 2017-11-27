'use strict';

const options = new Options();
const inputs = document.querySelectorAll('input');

for (const element of document.querySelectorAll('[data-l10n-id]')) {
    element.textContent = chrome.i18n.getMessage(element.dataset.l10nId);
}

inputs.forEach((input) => options.loadDefault(input));
options.loadAllFromLocalStorage();
for (const input of inputs) {
    input.addEventListener('change', (e) => options.saveInputOnChange(e));
}
