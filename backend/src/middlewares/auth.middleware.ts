import { NextFunction, Request, Response } from "express";
import { isTokenBlacklist } from "../repositries/cache.repository";
import { serverConfig } from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken' 
import { StatusCodes } from "http-status-codes";
export const authMiddleWare = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.token.split(" ")[1]

    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message:`Token is provided`
        })
    }

    const tokenblackList = isTokenBlacklist(token)
    
    
    
    if (!tokenblackList) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message:`Token is not in Use`
        })
    }

    try {
        const decoded = jwt.verify(token,serverConfig.JWT_SECRET) as JwtPayload
        req.user = decoded
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message:`Invalid Token`
        })
    }
}