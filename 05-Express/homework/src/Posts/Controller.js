// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let prevId = 0;

const STATUS_USER_ERROR = 422;

const firstPost = (req, res, next) => {
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
  res.json(post); //el json ya devuelve una respuesta
  //   next();
};

const authorPost = (req, res) => {
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
};

const allPosts = (req, res, next) => {
  const { term } = req.query;
  if (term) {
    const termFilter = posts.filter(
      (post) => post.title.includes(term) || post.contents.includes(term)
    );

    return res.json(termFilter);
  }

  res.json(posts);
};

const authorPosts = (req, res) => {
  const author = req.params.author;
  const authorFilter = posts.filter((post) => post.author === author);

  if (authorFilter.length === 0) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
  }

  res.json(authorFilter);
};

const titlePost = (req, res) => {
  const { author, title } = req.params;
  const authorFilter = posts.filter(
    (post) => post.author === author && post.title === title
  );

  if (authorFilter.length === 0) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }

  res.json(authorFilter);
};

const putPost = (req, res) => {
  const { id, title, contents } = req.body;

  if (!id || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }

  // const idFilter = posts.filter((post) => post.id === id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(STATUS_USER_ERROR).json({
      error: "Su post no se encuentra en los registros",
    });
  }

  // si uso filter tengo que modificar el array original

  // posts.forEach(post => {
  //   if(post.id === id){
  //     post.title = title;
  //     post.contents = contents;
  //   }
  // })

  post.title = title;
  post.contents = contents;

  res.json(post);
};

const idDelete = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(STATUS_USER_ERROR).json({ error: "Debe ingresar un id" });
  }
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(STATUS_USER_ERROR).json({
      error: "El post que quiere eliminar no se encuentra en los registros",
    });
  }

  const idDelete = posts.filter((post) => post.id !== id);
  posts = idDelete;

  res.json({ success: true });
};

const authorDelete = (req, res) => {
  const { author } = req.body;

  if (!author) {
    return res.status(STATUS_USER_ERROR).json({
      error: "Debe ingresar un autor",
    });
  }

  const authorFilter = posts.filter((post) => post.author === author);

  if (!authorFilter.length) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe el autor indicado",
    });
  }

  const newPosts = posts.filter((post) => post.author !== author);

  posts = newPosts;

  res.json(authorFilter);
};

module.exports = {
  firstPost,
  authorPost,
  allPosts,
  authorPosts,
  titlePost,
  putPost,
  idDelete,
  authorDelete,
};
