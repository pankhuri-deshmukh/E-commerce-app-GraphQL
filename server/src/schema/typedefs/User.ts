import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql'

export const UserType = new GraphQLObjectType({
    name: "Users",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})