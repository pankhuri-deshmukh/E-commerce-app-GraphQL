import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql'

export const UserType = new GraphQLObjectType({
    name: "Users",
    fields: () => ({
        user_id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        token: {type: GraphQLString},
    })
})

export const UserLoginType = new GraphQLObjectType({
    name: "UserLoginInput",
    fields: () => ({
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        token: {type: GraphQLString},
    })
})