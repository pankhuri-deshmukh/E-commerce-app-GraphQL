import {GraphQLObjectType, GraphQLID, GraphQLFloat, GraphQLString} from 'graphql'
import { UserType } from './User'

export const OrderType = new GraphQLObjectType({
    name: "Orders",
    fields: () => ({
        order_id: { type: GraphQLID },
        payment_status: { type: GraphQLString },
        total_amount: { type: GraphQLFloat },
        order_status: { type: GraphQLString },
        user : {type: UserType }
    }),
})