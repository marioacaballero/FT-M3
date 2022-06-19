const express = require('express')
const server = express();
const postRoutes = require("./Posts/server")
const authorRoutes = require('./Author/server')

server.use(express.json());

server.use('/posts', postRoutes)
server.use('/author', authorRoutes)


server.listen(3000);
