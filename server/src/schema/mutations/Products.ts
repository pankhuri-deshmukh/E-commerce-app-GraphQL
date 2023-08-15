import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLInputObjectType, GraphQLString } from "graphql";
import { ProductType } from "../typedefs/Products";
import { Products } from '../../entities/Products'

  const UpdateProductInputType = new GraphQLInputObjectType({
    name: 'UpdateProductInput',
    fields: {
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      price: { type: GraphQLFloat },
      category: { type: GraphQLString },
      quantity: { type: GraphQLInt },
      image: { type: GraphQLString },
    },
  });
  

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
    async resolve(parent: any, args: any) {
        const {name, description, price, category, quantity, image} = args
        await Products.insert({name, description, price, category, quantity, image})
        return args
    }
}

export const UPDATE_PRODUCT = {
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
    type: ProductType,
    args: {
        id : {type: GraphQLID}
    },
    async resolve(parent: any, args: any) {
        const id = args.id
        await Products.delete({product_id : id})
    } 
}

