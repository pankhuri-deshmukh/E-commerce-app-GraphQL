import { GraphQLInt, GraphQLString } from "graphql";
import { Cart } from "../../entities/Cart";
import { OrderType } from "../typedefs/Orders";
import { Orders } from "../../entities/Orders";
import { Users } from "../../entities/Users";
import { Cart_Items } from "../../entities/Cart_Items";
import { OrderItem } from "../../entities/Order_Items";
import { Products } from "../../entities/Products";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config({path : __dirname+'/.env'})

export const CREATE_ORDER = {
    type: OrderType,
    args: {
        payment_status : { type: GraphQLString },
        token : { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { payment_status, token} = args

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
        const userCart : Cart = await Cart.findOneOrFail({where : { 
            cart_id : user_id 
        }
    })
    const user : Users = await Users.findOneOrFail({where : { 
            user_id : user_id 
        }
    })

    //create new order
    const newOrder = await Orders.create({
        payment_status,
        total_amount : userCart.total_amount,
        user : user
    })
    Orders.insert(newOrder)

    //clear cart
    await Cart.update({ cart_id: user_id }, { total_amount: 0});
    

    //map cart items to order items
    const cartItems = await Cart_Items.find({
        relations: ['cart','product'],
        where: {
            cart: {
                cart_id: user_id
            }
        }
    })

    console.log(cartItems)

    for (const cartItem of cartItems) {

        const orderItem = OrderItem.create({
            product: cartItem.product,
            quantity: cartItem.quantity,
            subtotal: cartItem.subtotal,
            order : newOrder,
        });
        await OrderItem.insert(orderItem);

        // update no of products left
        await Products.update({ product_id: cartItem.product.product_id }, { quantity: cartItem.product.quantity - cartItem.quantity });

        
    }

    //clear cart items
    await Cart_Items.delete({
        cart: {
            cart_id: user_id
        }
    });

    return newOrder

        }
        catch {
            throw new Error("Unsuccessful!")
        }
        
    }
}