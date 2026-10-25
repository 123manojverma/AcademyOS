

export type userDTO = {
    name:string
    rollno:string
    college:string
    password:string
    email:string
    phoneno:string
}

export type CreateUserDTO = {
    id:number
    name:string
    email:string
}

export type loginDTO={
    rollno:string
    password:string
}

export type ResponseDTO={
    user:CreateUserDTO
    token:string
}