"use strict";

const request = require("request").defaults({followRedirect: false});

class Http {
    static get (url) {
        request.defaults({jar: false});
        const promise = new Promise(function (resolve, reject) {
            request
                .get(url)
                .on("response", function(response) {
                    resolve(response);
                })
                .on("error", function(error) {
                    reject(error);
                });
        });

        return promise;
    }
}

module.exports = Http;
