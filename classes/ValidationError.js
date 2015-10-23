"use strict";

class ValidationError extends Error {
    constructor (message, errorsMap) {
        super(message);
        this.errors = errorsMap;
    }

    asJson () {
        let errorsArray = [];
        for (let [key, value] of this.errors.entries()) {
            errorsArray.push({
                status: 422,
                title: key,
                detail: value
            });
        }
        return errorsArray;
    }
}

module.exports = ValidationError;
