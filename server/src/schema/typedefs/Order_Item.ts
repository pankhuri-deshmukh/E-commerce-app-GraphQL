import {GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLFloat} from 'graphql'
import { ProductType } from './Products'
import { OrderType } from './Orders'

export const OrderItemType = new GraphQLObjectType({
    name: "Order_Items",
    fields: () => ({
        item_id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        subtotal: { type: GraphQLFloat },
        product : { type: ProductType },
        order : { type: OrderType }
    })
})