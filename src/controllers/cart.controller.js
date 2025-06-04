import * as cartService from "../services/cart.service.js";
import catchError from "../utils/error.js";


export const addItem = async(req,res) =>{
    try{
        const id = req.user.id;
        const {itemId,quantity} = req.body

        const existCart = await cartService.checkUserCart(id);

        if(!existCart){
            const userCart = await cartService.createCart(id);
            const check = await cartService.checkAndAdded(userCart.cart.id,itemId,quantity);
            const updateTotal =  await cartService.updateTotal(userCart.id);
            res.status(201).json({Message:"Cart created and updated",userCart,check,updateTotal})
        }else{
            const check = await cartService.checkAndAdded(existCart.cart.id,itemId,quantity);
            const updateTotal = await cartService.updateTotal(existCart.cart.id);
            res.status(200).json({Message: "Cart update",existCart});
        }
        
    }catch(err){
        catchError(res,err);
    };
};

export const getAllItems = async (req,res) =>{
    try{
        const id = req.user.id;
        const {cart,total} = await cartService.getAllItems(id);

        res.status(200).json({Message: "All items in cart",cart,total})
    }catch(err){
        catchError(res,err);
        
    };
};

export const removeItem = async(req,res) =>{
    try{
        const id = req.user.id;
        const itemId = req.params.id;
        const {quantity} = req.body;

         await cartService.checkAndDelete(id,itemId,quantity);

        res.status(200).json({Message:'items update'})
    }catch(err){
        catchError(res,err);
    };
};

export const clearCart = async(req,res) =>{
    try{
        const id = req.user.id;

        const existCart = await cartService.checkUserCart(id);

        await cartService.clear(existCart.cart.id);
        console.log(existCart.cart.id)
        res.status(200).json({Message: "Cart cleared"})
    }catch(err){
        catchError(res,err);
    }
}