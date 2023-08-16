import { GraphQLInt, GraphQLList } from "graphql";
import { CartItemType } from "../typedefs/Cart_Item";
import { Cart_Items } from "../../entities/Cart_Items";

export const VIEW_CART = {
    type: new GraphQLList(CartItemType),
    args: {
        user_id: { type: GraphQLInt },
    },
    resolve(parent: any, args: any){
        const { user_id } = args
         return Cart_Items.find({
            relations:['cart', 'product'],
            where: {
                cart: {
                    cart_id: user_id
                }
            }
        })
    }
}