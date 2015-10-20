"use strict";

const express = require("express");
const wrap = require("wrapped"); // wrap is used until express supports generators
const User = require("../models/User");
const router = express.Router();

router.get("/", wrap(function* (request, response) {
    const users = yield User.all();
    response.json(users);
}));

router.post("/", wrap(function* (request, response) {
    const user = new User(request.body.user);
    yield user.save();
    response.json(user);
}));

module.exports = router;
