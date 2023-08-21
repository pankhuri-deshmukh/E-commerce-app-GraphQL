import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { CartItemType } from "../typedefs/Cart_Item";
import { Cart_Items } from "../../entities/Cart_Items";
import { isAuthorized } from "../../services/authorize";

export const VIEW_CART = {
    type: new GraphQLList(CartItemType),
    args: {
        token : { type: GraphQLString }
    },
    async resolve(parent: any, args: any){
        const { token } = args

        try{
             //authorization process -
        const obj = await isAuthorized(token);
        const user_id = obj.user_id
        if(user_id === -1){
            //authorization unsuccessful
            throw new Error("Unauthorized action");
        }

    //authorization successful - 
    return Cart_Items.find({
        relations:['cart', 'product'],
        where: {
            cart: {
                cart_id: user_id
            }
        }
    })
        }
        catch {
            throw new Error("Unsuccessful!")
        }
         
    }
}