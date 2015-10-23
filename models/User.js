"use strict";

const Mongorito = require("mongorito");
const ValidationError = require("../classes/ValidationError");
const Model = Mongorito.Model;

class User extends Model {
    configure () {
        this.before("save", "validate");
    }

    * validate (next) {
        let validationErrors = new Map();
        if(!this.attributes.hasOwnProperty("first_name")) {
            validationErrors.set("first_name", "must be present");
        }
        if(!this.attributes.hasOwnProperty("last_name")) {
            validationErrors.set("last_name", "must be present");
        }
        if (validationErrors.size > 0) {
            throw new ValidationError("validation failed", validationErrors);
        }

        yield next;
    }
}

module.exports = User;
