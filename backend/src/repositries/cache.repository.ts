import { serverConfig } from "../config"
import { redistClient } from "../config/redis.config"

async function ensureConnection() {
    if (!redistClient.isOpen) {
        await redistClient.connect()
    }
}

export const tokenBlackList = async(token:string,ttlSeconds:number)=>{
    await ensureConnection()

    const blacktoken = `${serverConfig.REDIS_BLACKLIST}${token}`

    await redistClient.set(blacktoken,'true',{
        EX:ttlSeconds
    }) 
}

export const isTokenBlacklist = async(token:string)=>{
   await ensureConnection()
   
   const key = `${serverConfig.REDIS_BLACKLIST}${token}`

   const exists = await redistClient.exists(key)

   return exists === 1
}