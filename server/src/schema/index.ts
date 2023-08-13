import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_PRODUCTS } from './queries/Products'
import { ADD_PRODUCT } from './mutations/Products'


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllProducts: GET_ALL_PRODUCTS
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addProduct : ADD_PRODUCT,
    }
})


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})