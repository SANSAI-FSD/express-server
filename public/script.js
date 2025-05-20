const apiUrl = "http://localhost:3000/api/posts";
// const apiUrl = "https://yourapiurl.vercel.app/api/posts";
const postContainer = document.getElementById("posts-container");
const courseInput = document.getElementById("course");
const descriptionInput = document.getElementById("description");

async function fetchPosts() {
  const response = await fetch(apiUrl);
  const posts = await response.json();
  console.log(posts);

  postContainer.innerHTML = "";

  let postDiv = "";
  postDiv = document.createElement("div");
  postDiv.style.backgroundColor = "lightBlue";
  postDiv.style.padding = "1em";

  posts.forEach((post) => {
    postDiv.innerHTML += `
    <h2>${post.course}</h2>
    <p>${post.description}</p>
    <button onclick="deletePost(${post.id})" >Delete</button>
     <button onClick="updatePost(${post.id})" >Edit</button>
    `;
  });

  // posts.forEach((post) => {
  //   const { _id, course, description } = post;
  //   postDiv.innerHTML += `
  //   <h2>${course}</h2>
  //   <p>${description}</p>
  //   <button onclick="deletePost('${_id}')" >Delete</button>
  //    <button onClick="updatePost('${_id}')" >Edit</button>
  //   `;
  // });

  postContainer.appendChild(postDiv);
}
fetchPosts();

async function createPost() {
  const course = courseInput.value;
  const description = descriptionInput.value;

  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ course, description }),
  });
  alert("new post added");
  fetchPosts();
}

async function deletePost(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  alert("Post deleted");
  fetchPosts();
}

async function updatePost(id) {
  const course = prompt("Enter new course name");
  const description = prompt("Enter new description");

  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course, description }),
  });
  alert("post has been edited");
  fetchPosts();
}
