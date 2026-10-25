import { NextFunction, Request, Response } from "express";
import { isTokenBlacklist } from "../repositries/cache.repository";
import { serverConfig } from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token?.split(' ')[1]

        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: `Token is not provided`
            })
            return
        }

        const tokenblackList = await isTokenBlacklist(token)

        if (tokenblackList) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: `Token is not in Use`
            })
            return
        }
        const decoded = jwt.verify(token, serverConfig.JWT_SECRET) as JwtPayload
        req.token = token
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: `Invalid Token`
        })
    }
}