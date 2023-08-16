import { GraphQLInt, GraphQLString } from "graphql";
import { Cart } from "../../entities/Cart";
import { OrderType } from "../typedefs/Orders";
import { Orders } from "../../entities/Orders";
import { Users } from "../../entities/Users";
import { Cart_Items } from "../../entities/Cart_Items";
import { OrderItem } from "../../entities/Order_Items";
import { Products } from "../../entities/Products";

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
}