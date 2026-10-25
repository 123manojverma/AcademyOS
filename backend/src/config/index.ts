// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number,
    MONGO_URI: string
    REDIS_URI: string
    REDIS_BLACKLIST: string
    JWT_SECRET: string
    JWT_EXPIRY: string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    REDIS_URI: process.env.REDIS_URI || "redis://localhost:6379",
    REDIS_BLACKLIST: process.env.REDIS_BLACKLIST || "redisblack",
    JWT_SECRET: process.env.JWT_SECRET || "jwt_secret",
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1h'
};