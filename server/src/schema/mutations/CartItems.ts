import { GraphQLInt } from "graphql";
import { CartItemType } from "../typedefs/Cart_Item";
import { Cart_Items } from "../../entities/Cart_Items";
import { Products } from "../../entities/Products";
import { calcTotal } from "../../services/calcTotal";
import { Cart } from "../../entities/Cart";

export const ADD_ITEM_TO_CART = {
    type: CartItemType,
    args: {
        user_id: { type: GraphQLInt },
        product_id: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
    },
    async resolve(parent: any, args: any) {
        const { user_id, product_id, quantity } = args;

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
}