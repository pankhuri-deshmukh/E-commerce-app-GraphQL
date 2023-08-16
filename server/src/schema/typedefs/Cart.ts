import {GraphQLObjectType, GraphQLID, GraphQLFloat } from 'graphql'

export const CartType = new GraphQLObjectType({
    name: "Cart",
    fields: () => ({
        cart_id: { type: GraphQLID },
        total_amount: { type: GraphQLFloat },
    })
})