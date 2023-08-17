import { GraphQLInt } from 'graphql'
import { UserType } from '../typedefs/User';
import { Users } from '../../entities/Users';

export const GET_USER_BY_ID = {
    type: UserType,
    args: {
        id : {type: GraphQLInt},
    },
    async resolve(parent: any, args : any) {
        const id = args.id
        const reqUser = await Users.findOne({where : {
            user_id : id
        },
    })
    return reqUser
    }
}