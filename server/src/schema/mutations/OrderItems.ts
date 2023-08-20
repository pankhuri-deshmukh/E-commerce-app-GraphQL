import { GraphQLInt, GraphQLString } from "graphql";
import { Cart } from "../../entities/Cart";
import { OrderType } from "../typedefs/Orders";
import { Orders } from "../../entities/Orders";
import { Users } from "../../entities/Users";
import { Cart_Items } from "../../entities/Cart_Items";
import { OrderItem } from "../../entities/Order_Items";
import { Products } from "../../entities/Products";
import { isAuthorized } from "../../services/authorize";

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
           const user_id = await isAuthorized(token);
           if(user_id === -1){
               //authorization unsuccessful
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
        user : user,
        order_status: 'confirmed'
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

export const CANCEL_ORDER = {
    type: OrderType,
    args: {
        order_id : { type: GraphQLInt },
        token : { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { order_id, token} = args

        try {
           //authorization process -
           const user_id = await isAuthorized(token);
           if(user_id === -1){
               //authorization unsuccessful
               throw new Error("Unauthorized action");
           }
        //authorization successful - 
        
    //cancel order
    const canOrder = await Orders.update({order_id : order_id},{order_status: 'cancelled'})

    //associated order items are unchanged since we still need details of cancelled orders, but
    //associated product quantities must be updated
    const orderItems = await OrderItem.find({ 
        relations: ['order','product'],
        where: {
            order: {
                order_id: order_id
            }
    }})

    //console.log(orderItems)
    for (const orderItem of orderItems) {

        await Products.update({ product_id: orderItem.product.product_id }, { quantity: orderItem.product.quantity + orderItem.quantity });

        
    }
    return canOrder
        }
        catch {
            throw new Error("Unsuccessful!")
        }
        
    }
}


