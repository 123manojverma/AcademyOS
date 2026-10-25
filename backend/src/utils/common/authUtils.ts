import jwt, { type SignOptions } from "jsonwebtoken";
import { serverConfig } from "../../config";

export const createJWT=(payload:any)=>{
    return jwt.sign(payload,serverConfig.JWT_SECRET,{
        expiresIn: serverConfig.JWT_EXPIRY as SignOptions["expiresIn"]
    })
}