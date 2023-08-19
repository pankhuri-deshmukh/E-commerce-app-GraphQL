import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Users } from "../entities/Users";

dotenv.config({path : __dirname+'/.env'})

export const isAuthorized = async (token : string) => {
    const secret_string = process.env.PROTECTED_STRING as string
        const decodedToken = jwt.verify(token, secret_string) as jwt.JwtPayload;

        const user_id = decodedToken.user_id
        const itsUser = await Users.findOneOrFail({ where: {
            user_id : user_id
        }})

        if (decodedToken.email !== itsUser.email) {
            return -1;
        }

        return user_id;

}