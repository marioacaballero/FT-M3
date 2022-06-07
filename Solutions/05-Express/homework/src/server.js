const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let prevId = 0;
let posts = [];

function idGen() {
  let id = 1;
  return function() {
    id = id + 1;
    return id;
  }
}
const newId = idGen();

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post"
    })
  }
  post.id = ++prevId;
  posts.push(post);
  return res.status(200).json(post)
})

server.get('/posts', (req, res) => {
  if (req.query.term) {
    const result = posts.filter((post) => post.title.includes(req.query.term) || post.contents.includes(req.query.term))
    return res.json(result)
  }
  return res.json(posts)
})

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;

  if(!id || !title || !contents) return res.status(STATUS_USER_ERROR).json({
    error: "No se recibieron los parámetros necesarios para actualizar el Post"
  })

  const post = posts.find((post) => post.id === id)

  if(!post) return res.status(STATUS_USER_ERROR).json({
    error: "El id no corresponde con un Post existente"
  })

  post.title = title;
  post.contents = contents;

  return res.json(post)
})

server.delete('/posts', (req, res) => {
  const { id } = req.body;

  if(!id) return res.status(STATUS_USER_ERROR).json({
    error: "No se recibieron los parámetros necesarios para eliminar un Post"
  })

  const post = posts.find((post) => post.id === id)

  if(!post) return res.status(STATUS_USER_ERROR).json({
    error: "El id no corresponde con un Post existente"
  })

  posts = posts.filter((post) => post.id !== id)

  return res.send({success :true}
    )
})

module.exports = { posts, server };
