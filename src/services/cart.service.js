import prisma from "../lib/prisma.js";
import catchError from "../utils/error.js";

export const checkUserCart = async(id) =>{
    try{
        const existCart = await prisma.user.findUnique({
            where:{id:parseInt(id)},
            include:{
                cart:{
                    include:{
                        items:true
                    }

            }
            }
        });
        if(!existCart.cart){
            return console.error("Cart not founded");
        };
        return existCart;
    }catch(err){
        console.log(err);
    };
};

export const createCart = async (id) =>{
    try{
        return await prisma.cart.create({
            data:{
                userId:id,
                total:0,
            }
        });
    }catch(err){
        console.error(err);
    };
};

export const checkAndAdded = async (cartId,itemId,quantityItems) =>{
    try{
        const cartItem = await prisma.itemsCart.findFirst({
            where:{
                cartId:cartId,
                itemId:itemId
            },
        });

        const item = await prisma.item.findUnique({
            where:{id:itemId},
            select:{stock:true},
            
        });
        if(!item){throw new Error("item not found")};

        if(cartItem){
            const newQuantity = cartItem.quantity + quantityItems;

            if(newQuantity <= item.stock){
                await prisma.itemsCart.update({
                    where:{id:cartItem.id},
                    data:{quantity:newQuantity}
                })
            }else{
                throw new Error("Not enough stock")
            }
        }else{
            if(quantityItems> item.stock){
                 throw new Error("Not enough stock");
            }


            await prisma.itemsCart.create({
                data:{
                    cart:{connect:{id:cartId}},
                    item:{connect:{id:itemId}},
                    quantity:quantityItems
                }
            })
        }
    }catch(err){
        throw new Error(err);
    }
};

export const updateTotal = async(cartId) => {
    try{
        const cart = await prisma.cart.findUnique({
            where:{id:cartId},
            include:{
                items:{
                    include:{
                    item:true
                },
            }}
        }
    )
    const total = cart.items.reduce((acc,cur) => acc + (cur.item.price* cur.quantity),0);
    console.log(total)
        await prisma.cart.update({
            where:{id:cartId},
            data:{total:total}
        })
    }catch(err){
        console.error(err)
    }

};

export const getAllItems = async(id) =>{
    try{
        const userCart = await prisma.user.findUnique({
            where:{id:id},
            include:{
                cart:{
                    include:{
                        items:{
                            include:{
                                item:true,
                            }
                        }
                    }
                }
            },

        }
        )
        const cart =userCart.cart.items;
        if(!cart){throw new Error("cart not found")};
        const total =userCart.cart.total;
        console.log(total)
        return {cart,total};
        }catch(err){
            throw err
        };
};


export const checkAndDelete = async(id,itemId,quantityItem) =>{
    try{
        const existCart = await checkUserCart(id);

        if(!existCart){throw new Error("Cart not founded")};

        const cartItems = existCart.cart.items;

        const existItem = cartItems.some(item => item.itemId === Number(itemId));

        if(!existItem){ throw new Error("Items not found")};

        const item = await prisma.itemsCart.findFirst({
            where:{itemId:Number(itemId)},
        })

        if(item.quantity > quantityItem){
            const currQuantity = item.quantity - quantityItem;
            
            await prisma.itemsCart.update({
                where:{id:item.id},
                data:{
                    quantity:currQuantity
                }
            })
            await updateTotal(existCart.cart.id)
        }else if(item.quantity <= quantityItem){
            await prisma.itemsCart.delete({
                where:{id:item.id}
            })
            await updateTotal(existCart.cart.id)
        }else {
            throw new Error("incorrect quatity");
        }
    }catch(err){
        throw err
    }
}

export const clear = async(id) =>{
    try{
        await prisma.itemsCart.deleteMany({
            where:{
                cartId:id
            }
        })
    }catch(err){
        throw new Error("Cart not cleared");
    };
};