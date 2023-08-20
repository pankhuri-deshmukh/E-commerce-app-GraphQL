import { GraphQLInt, GraphQLString } from "graphql";
import { CartItemType } from "../typedefs/Cart_Item";
import { Cart_Items } from "../../entities/Cart_Items";
import { Products } from "../../entities/Products";
import { calcTotal } from "../../services/calcTotal";
import { Cart } from "../../entities/Cart";
import { isAuthorized } from "../../services/authorize";

export const ADD_ITEM_TO_CART = {
    type: CartItemType,
    args: {
        product_id: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        token: {type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const {product_id, quantity, token } = args;
        console.log(args)
        try {

            //authorization process -
            const user_id = await isAuthorized(token);
            if(user_id === -1){
                //authorization unsuccessful
                throw new Error("Unauthorized action");
            }

        //authorization successful - 
            const reqProduct : Products = await Products.findOneOrFail({where : { 
                product_id : product_id 
                }
            })
            console.log(reqProduct)

        const itsCart = await Cart.findOneOrFail({
            where : {
                cart_id : user_id
            }
        })
        console.log(itsCart)

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
        console.log(cartItem)

        await Cart_Items.insert(cartItem);

        return cartItem;


        }
        catch {
            throw new Error("Unsuccessful!")
        }

        
    }
}

export const REMOVE_ITEM_FROM_CART = {
    type: CartItemType,
    args: {
        cart_item_id: { type: GraphQLInt },
        token: {type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const {cart_item_id, token } = args;

        try {

            //authorization process -
            const user_id = await isAuthorized(token);
            if(user_id === -1){
                //authorization unsuccessful
                throw new Error("Unauthorized action");
            }

        //authorization successful - 
        const item = await Cart_Items.findOneOrFail({ where : {
            cart_item_id : cart_item_id
        }})

    const itsCart = await Cart.findOneOrFail({
        where : {
            cart_id : user_id
        }
    })

    const updatedAmt = itsCart.total_amount - item.subtotal
    await Cart.update({ cart_id: user_id }, { total_amount: updatedAmt });
 
    await Cart_Items.delete({ cart_item_id: cart_item_id });

    return { success: true, message: "Item successfully removed from the cart" };
        }
        catch {
            throw new Error("Unsuccessful!")
        }
    }
}