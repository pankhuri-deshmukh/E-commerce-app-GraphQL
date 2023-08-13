import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt } from 'graphql';

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
