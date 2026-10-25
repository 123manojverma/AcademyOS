import { NextFunction, Request, Response } from "express";
import { isTokenBlacklist } from "../repositries/cache.repository";
import { serverConfig } from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken' 
export const authMiddleWare = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.token.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:`Token is provided`
        })
    }

    const tokenblackList = isTokenBlacklist(token)
    
    
    
    if (!tokenblackList) {
        return res.status(403).json({
            message:`Token is not in Use`
        })
    }

    try {
        const decoded = jwt.verify(token,serverConfig.JWT_SECRET) as JwtPayload
        req.user = decoded
    } catch (error) {
        return res.status(401).json({
            message:`Invalid Token`
        })
    }
}