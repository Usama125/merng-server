const { gql } = require('apollo-server');

module.exports = typeDefs = gql`
    #  " ! " means Required 
    # Post Type
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }

    # Comment Type
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }

    # Like
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }

    # User Type
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    # Register Input Fields
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    # Queries
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    
    # Mutations
    type Mutation {
        register(registerInput: RegisterInput) : User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }

    # Subscriptions works just like webSockets, in our case when a new post created, this will show newly created post when its listening
    # Subscriptions
    type Subscription {
        newPost: Post!
    }
`