import * as itemValidation from "../validations/items.validations.js";
import catchError from "../utils/error.js";


export const checkValideItems = async(req,res,next) =>{
    try{
        const {error,value} = itemValidation.validateItem.validate(req.body);

        if(error){
            return res.status(400).json({Error: "Items validate error"});
        };

        req.body = value;

        next();
    }catch(err){
        catchError(res,err);
    };
};


export const changeValidate = async(req,res,next) =>{
    try{
        const {error,value} = itemValidation.validateChangeItem.validate(req.body);

        if(error){
            return res.status(400).json({Error: "Items validate error"});
        };

        req.body = value;

        next();
    }catch(err){
        catchError(res,err);
    }
}