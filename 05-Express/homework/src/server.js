// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let prevId = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

server.post("/posts", (req, res, next) => {
  const { author, title, contents } = req.body;

  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
  let post = {
    id: ++prevId,
    author,
    title,
    contents,
  };

  posts.push(post);
  // return res.status(200).json(post)
  res.json(post);
  //   next();
});

server.post("/posts/author/:author", (req, res) => {
  const author = req.params.author;
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
  let post = {
    id: ++prevId,
    author,
    title,
    contents,
  };
  posts.push(post);
  res.json(post);
});

server.get("/posts", (req, res, next) => {
  const { term } = req.query;
  if (term) {
    const termFilter = posts.filter(
      (post) => post.title.includes(term) || post.contents.includes(term)
    );

    return res.json(termFilter);
  }

  res.json(posts);
  
});

server.get("/posts/:author", (req, res) => {
  const author = req.params.author;
  const authorFilter = posts.filter((post) => post.author === author);
 
  if (authorFilter.length === 0) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
  }

  res.json(authorFilter);
});

server.get("/posts/:author/:title", (req, res) => {
    const {author, title} = req.params
    const authorFilter = posts.filter((post) => post.author === author && post.title === title);

    if (authorFilter.length === 0) {
      return res
        .status(STATUS_USER_ERROR)
        .json({ error: "No existe ningun post con dicho titulo y autor indicado" });
    }
  
    res.json(authorFilter);
  });
// TODO: your code to handle requests

module.exports = { posts, server };
