import { GraphQLString } from "graphql"
import { UserType } from "../typedefs/User"
import { Users } from "../../entities/Users"
import { Cart } from "../../entities/Cart";

export const ADD_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { name, username, password, email } = args;

        // Create the cart entity for the user
        const cart = await Cart.create({
            total_amount: 0, 
        });
        await Cart.insert(cart);

        // Create the user entity
        const uid = cart.cart_id;
        const user = await Users.create({
            name,
            username,
            password,
            email,
            user_id: uid,
        });

        // Associate the cart with the user
        user.cart = cart;

        // Save the user entity
        await Users.insert(user);
        

        return user;
    }
}