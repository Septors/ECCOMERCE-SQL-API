import prisma from "../lib/prisma.js";

const connectDB = async() =>{
    try{
    await prisma.$connect();
    console.log("Db connected");
}catch(err){
    console.error("Db connect error",err);
    process.exit(1);
    };  
};
export default connectDB;