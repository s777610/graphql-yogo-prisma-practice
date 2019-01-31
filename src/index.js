const { GraphQLServer } = require("graphql-yoga");
const db = require("./db");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");
const Comment = require("./resolvers/Comment");

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

// graphql-yoga listen on 4000 by default
server.start(() => {
  console.log("The server is up ...");
});
