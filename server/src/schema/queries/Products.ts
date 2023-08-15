import { GraphQLID, GraphQLList } from 'graphql'
import { ProductType } from '../typedefs/Products'
import { Products } from '../../entities/Products';

export const GET_ALL_PRODUCTS = {
    type: new GraphQLList(ProductType),
    resolve() {
        return Products.find();
    }
}

export const GET_PRODUCT_BY_ID = {
    type: ProductType,
    args: {
        id : {type: GraphQLID},
    },
    async resolve(parent: any, args : any) {
        const id = args.id
        const reqProduct = await Products.findOne({where : {
            product_id : id
        },
    })
    return reqProduct
    }
}