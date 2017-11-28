'use strict';

const options = new Options();

// Load options values from storage.
options.loadAllFromLocalStorage().then(() => {
    // Watch for input changes and store the new values.
    document.querySelectorAll('[data-option-id]').forEach((input) =>
        input.addEventListener('change', (e) => options.updateOptionFromInput(e.target))
    );
});

for (const element of document.querySelectorAll('[data-l10n-id]')) {
    element.textContent = browser.i18n.getMessage(element.dataset.l10nId);
}
