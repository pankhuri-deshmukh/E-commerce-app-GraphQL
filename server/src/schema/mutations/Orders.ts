import { GraphQLInt, GraphQLString } from "graphql";
import { Cart } from "../../entities/Cart";
import { Products } from "../../entities/Products";
import { OrderType } from "../typedefs/Orders";
import { Orders } from "../../entities/Orders";

export const CREATE_ORDER = {
    type: OrderType,
    args: {
        payment_status : { type: GraphQLString },
        user_id: { type: GraphQLInt },
    },
    async resolve(parent: any, args: any) {
        const { payment_status, user_id } = args

        const userCart : Cart = await Cart.findOneOrFail({where : { 
                cart_id : user_id 
            }
        })
        
        const newOrder = await Orders.create({
            payment_status,
            total_amount : payment_status,
        })

        return newOrder
    }
}