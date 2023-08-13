import { GraphQLList } from 'graphql'
import { ProductType } from '../typedefs/Products'
import { Products } from '../../entities/Products';

export const GET_ALL_PRODUCTS = {
    type: new GraphQLList(ProductType),
    resolve() {
        return Products.find();
    }
}