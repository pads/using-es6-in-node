"use strict";

class ValidationError extends Error {
    constructor (message, errorsMap) {
        super(message);
        this.errors = errorsMap;
    }

    asJson () {
        let errorsArray = [];
        for (let [title, detail] of this.errors.entries()) {
            errorsArray.push({
                status: 422,
                title, // Shorthand for title: title
                detail
            });
        }
        return errorsArray;
    }
}

module.exports = ValidationError;
