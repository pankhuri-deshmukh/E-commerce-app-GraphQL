import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLInputObjectType } from 'graphql';

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    product_id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    image: { type: GraphQLString },
  }),
});

export const UpdateProductInputType = new GraphQLInputObjectType({
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
