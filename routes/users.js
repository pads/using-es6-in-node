"use strict";

const express = require("express");
const wrap = require("wrapped"); // wrap is used until express supports generators
const User = require("../models/User");
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
