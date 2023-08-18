import { GraphQLInt, GraphQLString } from "graphql";
import { CartItemType } from "../typedefs/Cart_Item";
import { Cart_Items } from "../../entities/Cart_Items";
import { Products } from "../../entities/Products";
import { calcTotal } from "../../services/calcTotal";
import { Cart } from "../../entities/Cart";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Users } from "../../entities/Users";

dotenv.config({path : __dirname+'/.env'})

export const ADD_ITEM_TO_CART = {
    type: CartItemType,
    args: {
        product_id: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        token: {type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const {product_id, quantity, token } = args;

        try {

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
            const reqProduct : Products = await Products.findOneOrFail({where : { 
                product_id : product_id 
                }
            })

        const itsCart = await Cart.findOneOrFail({
            where : {
                cart_id : user_id
            }
        })

        itsCart.total_amount += calcTotal(reqProduct.price, quantity)
        await Cart.update({ cart_id: user_id }, { total_amount: itsCart.total_amount });

        //user_id is the same as cart_id
        // Create the cart item entry 
        const cartItem = await Cart_Items.create({
            quantity,
            subtotal: calcTotal(reqProduct.price, quantity),
            product: reqProduct,
            cart : itsCart,
        });

        await Cart_Items.insert(cartItem);

        return cartItem;


        }
        catch {
            throw new Error("Unsuccessful!")
        }

        
    }
}