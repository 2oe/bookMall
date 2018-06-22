define(function() {
    var storage = window.localStorage;

    var obj = {
        set: function(key, val) {
            if (!val) {
                storage.removeItem(key)
            } else {
                storage.setItem(key, JSON.stringify(val))
            }
        },
        get: function(key) {
            var val = storage.getItem(key);
            return JSON.parse(val)
        },
        remove: function(key) {
            storage.removeItem(key)
        },
        clear: function() {
            storage.clear();
        }
    };

    return obj
})