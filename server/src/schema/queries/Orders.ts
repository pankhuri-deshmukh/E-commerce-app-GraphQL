import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { OrderType } from "../typedefs/Orders";
import { Orders } from "../../entities/Orders";
import { OrderItemType } from "../typedefs/Order_Item";
import { OrderItem } from "../../entities/Order_Items";
import { isAuthorized } from "../../services/authorize";

export const VIEW_ALL_ORDERS = {
    type: new GraphQLList(OrderType),
    args: {
        token : {type: GraphQLString }
    },
    async resolve(parent: any, args: any){
        const { token } = args

        try{
            //authorization process -
        const user_id = await isAuthorized(token);
        if(user_id === -1){
            //authorization unsuccessful
            throw new Error("Unauthorized action");
        }

    //authorization successful - 
         return Orders.find({
            relations:['user',],
            where: {
                user: {
                    user_id : user_id
                }
            }
        })
        }
        catch {
            throw new Error("Unsuccessful!")
        }

        
    }
}

export const VIEW_ORDER_DETAILS = {
    type: new GraphQLList(OrderItemType),
    args: {
        order_id: { type: GraphQLInt },
        token : {type : GraphQLString }
    },
    async resolve(parent: any, args: any){
        const { order_id, token } = args
        console.log(args)

        try{
            //authorization process -
            const user_id = await isAuthorized(token);
            if(user_id === -1){
                //authorization unsuccessful
                throw new Error("Unauthorized action");
            }

    //authorization successful - 
    return OrderItem.find({
        relations:['order', 'product'],
        where: {
            order: {
                order_id: order_id
            }
        }
    })
        }
        catch {
            throw new Error("Unsuccessful!")
        }
         
    }
}