"use strict";

module.exports = {
    get: function (target, name) {
        return target.attributes[name];
    }
};
