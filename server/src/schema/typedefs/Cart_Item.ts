import {GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLFloat} from 'graphql'
import { ProductType } from './Products'
import { CartType } from './Cart'

export const CartItemType = new GraphQLObjectType({
    name: "Cart_Items",
    fields: () => ({
        cart_item_id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        subtotal: { type: GraphQLFloat },
        product : { type: ProductType },
        cart : { type: CartType }
    })
})