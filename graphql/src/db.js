// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: "1",
    name: "Wilson",
    email: "s777610@gmail.com",
    age: 26
  },
  {
    id: "2",
    name: "Boyboy",
    email: "boyboy@gmail.com"
  },
  {
    id: "3",
    name: "Man",
    email: "man999@gmail.com",
    age: 14
  }
];

const posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "1"
  },
  {
    id: "11",
    title: "GraphQL 201",
    body: "This is an advanced GraphQL post...",
    published: false,
    author: "1"
  },
  {
    id: "12",
    title: "Programming Music",
    body: "",
    published: true,
    author: "2"
  }
];

const comments = [
  {
    id: "102",
    text: "This worked well for me. Thanks!",
    author: "3",
    post: "10"
  },
  {
    id: "103",
    text: "Glad you enjoyed it.",
    author: "1",
    post: "10"
  },
  {
    id: "104",
    text: "This did no work.",
    author: "2",
    post: "11"
  },
  {
    id: "105",
    text: "Nevermind. I got it to work.",
    author: "1",
    post: "12"
  }
];

const db = {
  users,
  posts,
  comments
};

module.exports = db;
