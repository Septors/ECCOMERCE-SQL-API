import * as itemService from "../services/items.service.js";
import catchError from "../utils/error.js";

export const getAll = async (req,res) =>{
    try{
        const collection = await itemService.getAllItems();

        res.status(200).json({Message: "Collection item",collection});
    }catch(err){
         catchError(res,err);
    };
};

export const getById = async(req,res) =>{
    try{
        const {id} = req.params;

        const item = await itemService.findById(id);

        if(!item){
             return res.status(404).json({Error: "Item not found"});
        };

        res.status(200).json({Message: "Items allouwed",item});
    }catch(err){
        catchError(res,err);
    };
};

export const createItem = async(req,res) =>{
    try{
        const item = req.body;

        const newItem = await itemService.createItem(item);

        if(!newItem){
            res.status(422).json({Error: "item not created"});
        }

        res.status(201).json({Message: "Item created",newItem});
    }catch(err){
        catchError(res,err);
    };
};

export const updateItem = async(req,res) =>{
    try{
        const {id} = req.params;
        const payload = req.body;

        const newItem = await itemService.changeItem(id,payload);

        res.status(200).json({Message: "Item updated",newItem});
    }catch(err){
        catchError(res,err);
    };
};

export const deleteItem = async(req,res) =>{
    try{
        const {id} = req.params;
        
        const existItem = await itemService.findById(id);

        if(!existItem){
            res.status(404).json({Error: "item not founded"});
        };

        itemService.deleteItems(id);

        res.status(200).json({Message: "Items deleted"})
    }catch(err){
        catchError(res,err);
    };
};

