// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");
const controller = require('./Controller');

const server = express.Router();
// to enable parsing of json bodies for post requests
// TODO: your code to handle requests


server.post("/", controller.firstPost);

server.post("/author/:author", controller.authorPost);

server.get("/", controller.allPosts);

server.get("/:author", controller.authorPosts);

server.get("/:author/:title", controller.titlePost);

server.put("/", controller.putPost);

server.delete("/", controller.idDelete);



module.exports = server;
