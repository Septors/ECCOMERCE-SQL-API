import * as orderService from "../services/order.service.js";
import catchError from "../utils/error.js";

export const createOrder = async(req,res) =>{
    try{
        const id = req.user.id;

        const {status} = req.body;

        const order = await orderService.create(id,status);

        res.status(201).json({Message: "Order created",order});
    }catch(err){
        catchError(res,err);
    };
};

export const getOrder = async(req,res) =>{
    try{
        const userId = req.user.id;

        const order = await orderService.checkAndGetOrder(userId);

        res.status(200).json({Message: "Order has been successfully placed",order});
    }catch(err){
        catchError(res,err);
    };
};

export const changeStatusOrder = async(req,res) =>{
    try{
        const userId = req.user.id;

        const {newStatus} = req.body;

        const changeOrder = await orderService.changeStatus(userId,newStatus);

        res.status(200).json({Message: "Status changed"});
    }catch(err){
        catchError(res,err);
    }
}