const { GraphQLServer } = require("graphql-yoga");
const uuidv4 = require("uuid/v4");
const db = require("./db");

// Resolvers (function)
const resolvers = {
  Query: {
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }
      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },

    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      }
      return db.posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },

    comments(parent, args, { db }, info) {
      return db.comments;
    },

    me() {
      return {
        id: "123444",
        name: "Wilson",
        email: "s777610@gmail.com"
      };
    },

    post() {
      return {
        id: "092",
        title: "GraphQL",
        body: "",
        published: false
      };
    }
  },

  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(user => user.email === args.email);
      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      db.users.push(user);

      return user;
    },

    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex(user => user.id === args.id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      // Delete user and its posts, comments
      const deletedUsers = db.users.splice(userIndex, 1); // splice return an array

      // delete posts of that user
      db.posts = db.posts.filter(post => {
        const match = post.author === args.id;
        if (match) {
          // delete comments of that post
          db.comments = db.comments.filter(comment => comment.post !== post.id);
        }
        return !match;
      });

      // delete comments of that user
      db.comments = db.comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },

    createPost(parent, args, { db }, info) {
      const userExists = db.users.some(user => user.id === args.data.author);
      if (!userExists) throw new Error("User not found");

      const post = {
        id: uuidv4(),
        ...args.data
      };

      db.posts.push(post);

      return post;
    },

    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex(post => post.id === args.id);
      if (postIndex === -1) throw new Error("Post not found");
      const deletePosts = db.posts.splice(postIndex, 1);

      // delete comments of that post
      db.comments = db.comments.filter(comment => comment.post !== args.id);

      return deletePosts[0];
    },

    createComment(parent, args, { db }, info) {
      const userExists = db.users.some(user => user.id === args.data.author);
      const postExists = db.posts.some(
        post => post.id === args.data.post && post.published
      );

      if (!userExists || !postExists) {
        throw new Error("Unable to find user and post");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      db.comments.push(comment);

      return comment;
    },

    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(
        comment => comment.id === args.id
      );
      if (commentIndex === -1) throw new Error("Comment not found");
      const deletedComments = db.comments.splice(commentIndex, 1);
      return deletedComments[0];
    }
  },

  // Post has author method because Post type has author property
  // parent === post
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },

  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, { db }, info) {
      return db.posts.find(post => {
        return post.id === parent.post;
      });
    }
  },

  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db
  }
});

// graphql-yoga listen on 4000 by default
server.start(() => {
  console.log("The server is up ...");
});
