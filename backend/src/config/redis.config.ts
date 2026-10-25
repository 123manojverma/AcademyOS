import { createClient } from "redis";
import { serverConfig } from ".";

const redistClient = createClient({
    url:serverConfig.REDIS_URI
})

redistClient.on("error",(error:any)=>{
    console.log(`redis connection error`,error);
})

redistClient.on("connect",()=>{
    console.log(`Redis connected`);
})

export async function redisConnect() {
    try {
        if (!redistClient.isOpen) {
            await redistClient.connect()
        }        
    } catch (error) {
        console.log(`some issue with redis connection`);
        throw error
    }
}

export async function closeRedis() {
    await redistClient.quit()
}