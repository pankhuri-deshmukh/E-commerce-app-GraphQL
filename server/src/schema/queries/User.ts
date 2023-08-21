import { GraphQLInt, GraphQLString } from 'graphql'
import { UserType } from '../typedefs/User';
import { Users } from '../../entities/Users';
import { isAuthorized } from '../../services/authorize';

export const GET_USER_BY_ID = {
    //MODIFICATION PENDING
    // for use in password reset
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

export const CHECK_IF_ADMIN = {
    type: UserType,
    args: {
        token : {type : GraphQLString }
    },
    async resolve(parent: any, args: any){
        const { token } = args

        try{
            //authorization process -
            const user_id = await isAuthorized(token);
            if(user_id === -1){
                //authorization unsuccessful
                throw new Error("Unauthorized action");
            }

    //authorization successful - 
    const reqUser = await Users.findOne({where : {
        user_id : user_id
    },
    })
    return reqUser
        }
        catch {
            throw new Error("Unsuccessful!")
        }
         
    }
}