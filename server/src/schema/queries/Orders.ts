//GET_USER_ORDERS
import { GraphQLInt, GraphQLList } from "graphql";
import { OrderType } from "../typedefs/Orders";
import { Orders } from "../../entities/Orders";
import { OrderItemType } from "../typedefs/Order_Item";
import { OrderItem } from "../../entities/Order_Items";

export const VIEW_ALL_ORDERS = {
    type: new GraphQLList(OrderType),
    args: {
        user_id: { type: GraphQLInt },
    },
    resolve(parent: any, args: any){
        const { user_id } = args
         return Orders.find({
            relations:['user',],
            where: {
                user: {
                    user_id : user_id
                }
            }
        })
    }
}

export const VIEW_ORDER_DETAILS = {
    type: new GraphQLList(OrderItemType),
    args: {
        order_id: { type: GraphQLInt },
    },
    resolve(parent: any, args: any){
        const { order_id } = args
         return OrderItem.find({
            relations:['order', 'product'],
            where: {
                order: {
                    order_id: order_id
                }
            }
        })
    }
}