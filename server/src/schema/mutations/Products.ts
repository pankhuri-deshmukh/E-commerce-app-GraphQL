import { GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";
import { ProductType } from "../typedefs/Products";

export const ADD_PRODUCT = {
    type: ProductType,
    args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        image: { type: GraphQLString },
    },
    resolve(parent: any, args: any) {
        const {name, description, price, category, quantity, image} = args
        return args
    }
}

