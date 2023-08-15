import {GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLFloat} from 'graphql'

export const CartItemType = new GraphQLObjectType({
    name: "Cart_Items",
    fields: () => ({
        cart_item_id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        subtotal: { type: GraphQLFloat },
    })
})