import prisma from "../lib/prisma.js";

export const checkEmail = async(email) =>{
    try{
        return await  prisma.user.findUnique({
            where: {email}
        });
    }catch(err){
        console.error("Error in time chack email",err);
    };
};

export const createUser = async({name,email,hashPassword}) =>{
    try{   

        const user = await prisma.user.create({
            data:{
            name,
            email,
            password:hashPassword,
        }
        });
        console.log("User created");
        return user;
    }catch(err){
        console.error("User not created",err);
    }
};


export const findUserById = async(id) =>{
    try{
        return prisma.user.findUnique({
            where: {id}
        });
    }catch(err){
        console.error(err);
    }
}