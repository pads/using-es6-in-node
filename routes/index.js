"use strict";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(request, response) {
    response.render("index", { title: "BrumES6" });
});

module.exports = router;
