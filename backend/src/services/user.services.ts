import { StatusCodes } from "http-status-codes";
import { CreateUser, FindUserByRollno } from "../repositries/user.repository"
import ClientError from "../utils/errors/clientError";
import { loginDTO, ResponseDTO, userDTO } from "../dto/user.dto";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/common/authUtils";
import { tokenBlackList } from "../repositries/cache.repository";

export const signupService = async (data: userDTO) => {
    try {
        const user = await CreateUser(data);

        if (!user) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Invalid data sent from the client',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }

        const token = createJWT({ id: user.id, name: user.name });

        const response: ResponseDTO = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }

        return response;
    } catch (error: any) {
        console.log('Signup service error', error);
        throw error;
    }
}

export const signinService = async (data: loginDTO) => {
    try {
        const user = await FindUserByRollno(data.rollno);

        if (!user) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Invalid data sent from the client',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new ClientError({
                explanation: 'Invalid password or email',
                message: 'Invalid password or email',
                statusCode: StatusCodes.UNAUTHORIZED
            })
        }

        const token = createJWT({ id: user.id, name: user.name });

        const response: ResponseDTO = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }

        return response;
    } catch (error: any) {
        console.log('Signin service error', error);
        throw error;
    }
}

export const logoutService = async (token: string, exp: number | undefined) => {
    try {
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const remainingTime = exp ? exp - nowInSeconds : 0;

        if (remainingTime > 0) {
            await tokenBlackList(token, remainingTime);
        }
    } catch (error: any) {
        console.log('Logout service error', error);
        throw error;
    }
}