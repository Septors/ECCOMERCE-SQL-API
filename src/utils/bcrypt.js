import bcrypt from "bcrypt";

export const hashPassword = async(password) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }catch(err){
        console.error("Password not hashed",err);
    };
};

export const comparePassword = async(password,currentPassword) =>{
    try{
        return await bcrypt.compare(password,currentPassword);
    }catch(err){
        console.error("Password not matched",err);
    };
};