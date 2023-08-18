import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { CartItemType } from "../typedefs/Cart_Item";
import { Cart_Items } from "../../entities/Cart_Items";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Users } from "../../entities/Users";

dotenv.config({path : __dirname+'/.env'})

export const VIEW_CART = {
    type: new GraphQLList(CartItemType),
    args: {
        token : { type: GraphQLString }
    },
    async resolve(parent: any, args: any){
        const { token } = args

        try{
             //authorization process -
        const secret_string = process.env.PROTECTED_STRING as string
        const decodedToken = jwt.verify(token, secret_string) as jwt.JwtPayload;

        const user_id = decodedToken.user_id
        const itsUser = await Users.findOneOrFail({ where: {
            user_id : user_id
        }})

        if (decodedToken.email !== itsUser.email) {
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