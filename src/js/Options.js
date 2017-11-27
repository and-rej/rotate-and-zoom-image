function Options() {
    this._prefix = 'options.';
    this._prefixRegExp = new RegExp('^' + this._prefix);
}

Options.prototype = {
    _getOptionId: function(input) {
        return this._prefix + input.id;
    },

    _getInputId: function(optionId) {
        return optionId.replace(this._prefixRegExp, '');
    },

    _isValid: function(input) {
        return (input.parentElement.querySelector(':valid') === input);
    },

    _getValue: function(input) {
        if (input.type !== 'checkbox') {
            return input.value;
        } else {
            return input.checked;
        }
    },

    _saveOption: function(id, value) {
        const option = { };
        option[id] = value;
        browser.storage.local.set(option);
    },

    saveInputOnChange: function(e) {
        const input = e.target;
        if (this._isValid(input)) {
            const optionId = this._getOptionId(input);
            const value = this._getValue(input);
            this._saveOption(optionId, value);
        }
    },

    _getDefaultFor: function(id) {
        switch(id) {
            case `${this._prefix}transformation_animation_enabled`:
                return true;
                break;
            case `${this._prefix}transformation_animation_duration`:
                return 0.5;
                break;
        }
    },

    _setValue: function(input, value) {
        if (input.type !== 'checkbox') {
            input.value = value;
        } else {
            input.checked = value;
        }
    },

    loadDefault: function(input) {
        const defaultValue = this._getDefaultFor(this._getOptionId(input));
        this._setValue(input, defaultValue);
    },

    loadAllFromLocalStorage: function() {
        browser.storage.local.get().then((items) => {
            Object.keys(items).map((key, index) => {
                if (key.startsWith(this._prefix)) {
                    const value = items[key];
                    const inputId = this._getInputId(key);
                    const input = document.getElementById(inputId);
                    this._setValue(input, value);
                }
            });
        });
    },

    get: function(optionIds, callback) {
        browser.storage.local.get(optionIds).then((items) => {
            for (optionId of optionIds) {
                if (items[optionId] === undefined) {
                    items[optionId] = this._getDefaultFor(optionId);
                }
            }
            callback(items);
        });
    },
};
