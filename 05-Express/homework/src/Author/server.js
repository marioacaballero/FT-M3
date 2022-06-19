const express = require("express");
const controller = require("../Posts/Controller");

const server = express.Router();

server.delete("/", controller.authorDelete);

module.exports = server;
