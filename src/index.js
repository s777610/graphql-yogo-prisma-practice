const { GraphQLServer, PubSub } = require("graphql-yoga");
const db = require("./db");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");
const Comment = require("./resolvers/Comment");

// pass to all of resolver methods
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context: {
    db,
    pubsub
  }
});

// graphql-yoga listen on 4000 by default
server.start(() => {
  console.log("The server is up ...");
});
