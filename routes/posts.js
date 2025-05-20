import express from "express";

const router = express.Router();

let posts = [
  { id: 1, course: "React JS", description: "React is a JS library" },
  { id: 2, course: "Next JS", description: "Next is a JS framework" },
  { id: 3, course: "R3fiber", description: "3D js library" },
  { id: 4, course: "MongoDB", description: "non-relational database" },
];

router.get("/api/posts/", (req, res) => {
  let { limit } = req.query;

  const hasInvalidQuery = Object.keys(req.query).some((key) => key !== "limit");
  if (hasInvalidQuery || req.query.limit === "") {
    return res.status(400).json({ message: "invalid query parameter" });
  }

  const parsedLimit = Number(limit);

  if (!isNaN(parsedLimit) && parsedLimit > 0) {
    if (parsedLimit > posts.length) {
      res.status(404).json({ message: `There is only ${posts.length} posts` });
    } else {
      res.status(200).json(posts.slice(0, parsedLimit));
    }
  } else {
    res.status(200).json(posts);
  }
});

router.get("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `post with id ${id} not found` });
  }
});

router.post("/api/posts/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    course: req.body.course,
    description: req.body.description,
  };

  if (!newPost.course || !newPost.description) {
    return res
      .status(400)
      .json({ message: "please add course or description" });
  }
  posts.push(newPost);
  res.status(201).json(newPost);
  console.log(posts);
});

router.put("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (post) {
    post.course = req.body.course;
    post.description = req.body.description;
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `post with id ${id} not found` });
  }
});

router.delete("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (post) {
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json({ message: `post with id ${id} is deleted` });
  } else {
    res.status(404).json({ message: `post with id ${id} not found` });
  }
});

export default router;
// const user = {
//   name: "arun",
//   job: "dev",
// };
// console.log(Object.keys(user))

// console.log(Object.keys(user).some((key)=> key === "laptop"))

// console.log(Object.keys(user).some((key) => key === "name"));
// console.log(Object.keys(user).every((key) => key === "name"));
