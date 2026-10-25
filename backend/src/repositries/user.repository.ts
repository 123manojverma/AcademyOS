import { userDTO } from "../dto/user.dto";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt';


export async function CreateUser(data: userDTO) {
    const isuserexist = await prisma.user.findUnique({
        where: {
            rollno: data.rollno
        }
    });

    if (isuserexist) {
        throw new Error("User already exists!!")
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);

    const user = prisma.user.create({
        data: {
            rollno: data.rollno,
            password: hash,
            college: data.rollno,
            email: data.email,
            name: data.name,
            phoneno: data.phoneno
        }, select: {
            id:true,
            password: true,
            college: true,
            email: true,
            name: true,
            phoneno: true
        }
    });

    return user;
}


export async function FindUserByRollno(rollno: string) {
    const checkuser = await prisma.user.findUnique({
        where: {
            rollno: rollno
        }
    });

    return checkuser;
}