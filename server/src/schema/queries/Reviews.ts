import { GraphQLInt, GraphQLList } from 'graphql';
import { ReviewType } from '../typedefs/Reviews';
import { Review } from '../../entities/Review'; 

export const VIEW_REVIEWS = {
  type: new GraphQLList(ReviewType), 
  args: {
    product_id : {type: GraphQLInt},
},
  async resolve(parent: any, args: any) {
    const { product_id } = args;

    const reviews = await Review.find({
      where: {
        product: { product_id },
      },
    });

    return reviews;
  },
};
