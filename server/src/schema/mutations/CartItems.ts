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
        const obj = await isAuthorized(token);
        const user_id = obj.user_id
        if(user_id === -1){
            //authorization unsuccessful
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

        let initial = 0

        const existingItem = await Cart_Items.findOne({
          relations: ['cart', 'product'],
          where: {
            cart: {
              cart_id: user_id
            },
            product: {
              product_id: product_id
            }
          }
        })

        if(existingItem) {
          //there is already such an item in the cart - update it.
          initial = existingItem.quantity
          if((initial + quantity) > reqProduct.quantity){
            throw new Error("quantity exceeds available")
            // return {
            //   message: "quantity exceeds available"
            // }
          }

          const newQ = existingItem.quantity + quantity
          const newS = calcTotal(reqProduct.price, newQ)
          const updItem = await Cart_Items.update({cart_item_id: existingItem.cart_item_id},{quantity: newQ, subtotal: newS})

          return updItem
        }

        else{
          //user_id is the same as cart_id
        // Create the cart item entry 
        if((initial + quantity) > reqProduct.quantity){
          throw new Error("quantity exceeds available")
          // return {
          //   message: "quantity exceeds available"
          // }
        }

        const cartItem = await Cart_Items.create({
          quantity,
          subtotal: calcTotal(reqProduct.price, quantity),
          product: reqProduct,
          cart : itsCart,
      });

      await Cart_Items.insert(cartItem);

        return cartItem;
        }

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
        const obj = await isAuthorized(token);
        const user_id = obj.user_id
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