import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import express from "express";
import posts from "./routes/posts.js";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(posts);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
