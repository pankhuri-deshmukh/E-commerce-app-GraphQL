import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLInputObjectType, GraphQLString } from "graphql";
import { ProductType, UpdateProductInputType } from "../typedefs/Products";
import { Products } from '../../entities/Products'
import { isAuthorized } from "../../services/authorize";
import { Users } from "../../entities/Users";

//Modifications needed

export const ADD_PRODUCT = {
    //ADMIN FUNCTION ONLY
    type: ProductType,
    args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        image: { type: GraphQLString },
        token: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const {name, description, price, category, quantity, image, token} = args

        try{
           //authorization process -
        const obj = await isAuthorized(token);
        const user_id = obj.user_id
        if(user_id === -1){
            //authorization unsuccessful
            throw new Error("Unauthorized action");
        }

    //authorization successful - 
    if(obj.role === 'admin')
    await Products.insert({name, description, price, category, quantity, image})

    return args

        }
        catch{
            throw new Error("Unsuccessful!")
        }

        
        
    }
}

export const UPDATE_PRODUCT = {
    //ADMIN FUNCTION ONLY
    type: ProductType,
    args: {
        id : {type: GraphQLID},
        input : {type: UpdateProductInputType}
       
    },
    async resolve(parent: any, args: any) {
        const id = args.id
        const oldProduct = await Products.findOne({where : {
                product_id : id
            },
        })
        await Products.update({product_id : id}, {...oldProduct,...args.input})
        
    } 
}

export const DELETE_PRODUCT = {
    //ADMIN FUNCTION ONLY
    type: ProductType,
    args: {
        id : {type: GraphQLID}
    },
    async resolve(parent: any, args: any) {
        const id = args.id
        await Products.delete({product_id : id})
    } 
}

