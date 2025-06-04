import prisma from "../lib/prisma.js";
import * as cartService from "../services/cart.service.js";

export const create = async(userId,status) =>{
    try{
             const existCart = await cartService.checkUserCart(userId);

            if(!existCart){throw new Error("Cart not founded")};

            console.log(status)
            const order = await prisma.order.create({
                data:{
                    user:{
                        connect:{
                            id:userId,
                    }},
                    cart:{
                        connect:{
                            id:existCart.cart.id
                        }

                    },
                    status:status

                    
                },
            });
            
            return order;
    }catch(err){
        throw err;
    };
};

export const checkAndGetOrder = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          include: {
            cart: {
                include:{
                    items:{
                        include:{
                            item:true
                        }
                    }
                }
            }
          }
        }
      }
    });

    if (!user || user.orders.length === 0) {
      throw new Error("Orders not found");
    }

    return user.orders; // или возвращай user, если нужно вместе с данными пользователя
  } catch (err) {
    throw err;
  }
};

export const changeStatus = async(userId,newStatus) =>{
    try{
         const order = await orderService.checkAndGetOrder(userId);

         await prisma.order.update({
            where:{id:order.id},
            data:{
                status:newStatus,
            }

         })
    }catch(err){
        throw err;
    }
}