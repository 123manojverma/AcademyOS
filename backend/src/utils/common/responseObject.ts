export const internalErrorResponse=(error:any)=>{
    return {
        success:false,
        err:error,
        data:{},
        message:'Internal Server Error'
    }
}

export const customErrorResponse=(error:any)=>{
    if(!error.message && !error.explanation){
        return internalErrorResponse(error);
    }
    return {
        success:false,
        err:error.explanation,
        data:{},
        message:error.message
    }
}

export const successResponse=(data:any,message:string)=>{
    return {
        success:true,
        message,
        data,
        err:{}
    }
}