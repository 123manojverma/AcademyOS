import { Request, Response } from "express";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject";
import { StatusCodes } from "http-status-codes";
import { logoutService, signinService, signupService } from "../services/user.services";

export const signupController=async (req:Request,res:Response)=>{
    try {
        const response=await signupService(req.body);

        res.cookie("token",`Bearer ${response.token}`,{httpOnly:true,secure:true,sameSite:"strict"});

        res.status(StatusCodes.CREATED).json(successResponse(response,'User created successfully'));
    } catch (error:any) {
        console.log('signup Controller error',error);
        if(error.statusCode){
            res.status(error.statusCode).json(customErrorResponse(error));
            return;
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const signinController=async (req:Request,res:Response)=>{
    try {
        const response=await signinService(req.body);

        res.cookie("token",`Bearer ${response.token}`,{httpOnly:true,secure:true,sameSite:"strict"});

        res.status(StatusCodes.CREATED).json(successResponse(response,'User login successfully'));
    } catch (error:any) {
        console.log('signin Controller error',error);
        if(error.statusCode){
            res.status(error.statusCode).json(customErrorResponse(error));
            return;
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const logoutController=async (req:Request,res:Response)=>{
    try {
        const token=req.token;

        const exp=req.user?.exp;

        await logoutService(token,exp);

        res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"strict"});

        res.status(StatusCodes.OK).json(successResponse("","User logged out successfully"));
    } catch (error:any) {
        console.log('logout Controller error',error);
        if(error.statusCode){
            res.status(error.statusCode).json(customErrorResponse(error));
            return;
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}