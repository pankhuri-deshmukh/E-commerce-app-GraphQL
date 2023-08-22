import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { ReviewType } from '../typedefs/Reviews';
import { Review } from '../../entities/Review'; 
import { Products } from '../../entities/Products';
import { Users } from '../../entities/Users';

export const ADD_REVIEW = {
  type: ReviewType,
  args: {
    product_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { product_id, user_id, rating, comment } = args;

    const user = await Users.findOne({where : {
        user_id : user_id
    },
});
    const product = await Products.findOne({where : {
        product_id : product_id
    },
});

    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    const newReview = Review.create({
      rating,
      comment,
      user,
      product,
    });

    await Review.insert(newReview);

    return newReview;
  },
};
