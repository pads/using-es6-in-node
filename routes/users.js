require("harmony-reflect");

"use strict";

const express = require("express");
const wrap = require("wrapped"); // wrap is used until express supports generators
const User = require("../models/User");
const Http = require("../classes/Http");
const modelProxy = require("../proxies/modelProxy");
const router = express.Router();

router.get("/", wrap(function* (request, response) {
    const users = yield User.all();
    response.json(users);
}));

router.get("/:id", wrap(function* (request, response) {
    const user = yield User.findOne({_id: request.params.id});
    console.log(`Found user: ${user.toString()}`);
    response.json(user);
}));

router.get("/:id/social", function (request, response) {
    const user = {
        twitter_username: "_pads",
        facebook_username: "pads84"
    };
    const userProxy = new Proxy(user, modelProxy);

    const avatarRequests = [
        Http.get(`http://avatars.io/twitter/${user.twitter_username}`),
        Http.get(`http://avatars.io/facebook/${user.facebook_username}`)
    ];

    Promise.all(avatarRequests).then(function onSuccess(responses) {
        response.json(Object.assign(user, {
            twitter_avatar: responses[0].headers.location,
            facebook_avatar: responses[1].headers.location
        }));
    });
});

router.post("/", wrap(function* (request, response) {
    const user = new User(request.body.user);
    try {
        yield user.save();
        response.status(201).json(user);
    } catch (exception) {
        console.log(exception.errors.entries());
        response.status(422).json({ errors: exception.asJson() });
    }
}));

module.exports = router;
