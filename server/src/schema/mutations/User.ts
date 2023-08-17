import { GraphQLString } from "graphql"
import { UserLoginType, UserType } from "../typedefs/User"
import { Users } from "../../entities/Users"
import { Cart } from "../../entities/Cart";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config({path : __dirname+'/.env'})

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

        //Check if user exists in db
        const existingUser = await Users.findOne({where : {
            email : email
        }})
        if(existingUser) {
            throw new Error("This email already exists.")
        }
        
        //IF USER DOES NOT ALREADY EXIST

        const hashedPassword = await bcrypt.hash(password, 11)
        
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
            password: hashedPassword,
            email,
            user_id: uid,
        });

        const secret_string = process.env.PROTECTED_STRING as string
        const token = jwt.sign({ user_id : user.user_id, email}, secret_string, {
            expiresIn: "3h"
        })

        // Associate the cart with the user
        user.cart = cart;
        user.token = token;

        // Save the user entity
        await Users.insert(user);
        return user;
    }
}

export const LOGIN_USER = {
    type: UserLoginType,
    args: {
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { password, email } = args;

        //see if a user exists with that email and entered password matches stored password, else return error
        const user = await Users.findOne({where : {
            email : email
        }})
        if(user && (await bcrypt.compare(password, user.password))) {
            //then create a new token
            //attach the new token to the user
            const secret_string = process.env.PROTECTED_STRING as string
            const token = jwt.sign({ user_id : user.user_id, email}, secret_string, {
            expiresIn: "3h"
            })

            user.token = token
            await Users.save(user)

            return user

        }
        else {
            throw new Error("Login failed.")
        } 
    }
}