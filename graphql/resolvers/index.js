const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
    // Modifiers :- Whenever a Post Typed data will be returned either from Query or Mutation or from Subscription
    // this will goes in parent before returning and we can change returned type as we want. let suppose we want to 
    // include "Mr. " before username we can do their. So in parent we will have returned post
    Post: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}