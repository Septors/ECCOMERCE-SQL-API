import prisma from "../lib/prisma.js";

export const getAllItems = async() =>{
    try{
        return await prisma.item.findMany();
    }catch(err){
        console.error(err);
    };
};

export const findById = async(id) =>{
    try{
        return await prisma.item.findUnique({
            where: {id: parseInt(id)},
        });
    }catch(err){
        console.error(err);
    };
};

export const createItem = async(payload) =>{
    try{
        return await prisma.item.create({
            data:{
            name:payload.name,
            description:payload.description,
            price:payload.price,
            stock: payload.stock
        }
        });
    }catch(err){
        console.error(err);
    };
};

export const changeItem = async(id,payload) =>{
    try{
        const existEmail = await findById(id);

        if(!existEmail){
            return console.error("Item not founded");
        };

        return await prisma.item.update({
            where:{id:parseInt(id)},
            data:{
                ...payload,
            }
        });
    }catch(err){
        console.error(err);
    };
};

export const deleteItems = async(id) =>{
    try{
        return  await prisma.item.delete({
            where:{id:parseInt(id)},
        });
    }catch(err){
        console.error(err);
    };
};