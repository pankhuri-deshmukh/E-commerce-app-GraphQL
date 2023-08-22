import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { UserType } from './User'; 
import { ProductType } from './Products'; 

export const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    review_id: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
    user: { type: UserType }, 
    product: { type: ProductType }, 
  }),
});





