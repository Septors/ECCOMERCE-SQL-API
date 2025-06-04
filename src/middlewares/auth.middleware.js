import * as token from '../utils/token.js';
import * as authService from "../services/auth.service.js";
import * as validateSchema from '../validations/user.validations.js'
import catchError from '../utils/error.js';


export const checkToken = async(req,res,next) =>{
    try{
        const authHeader = req.headers.authorization?.split(' ')[1];

        const decoded = await token.verifyAccessToken(authHeader);
        req.user ={
            id: decoded.userId,
            role: decoded.role,
        };
        
        next();
    }catch(err){
        catchError(res,err)
    };
};

export const validateLogin = (req,res,next) =>{
        const{error,value} = validateSchema.loginSchema.validate(req.body);

        if(error){
            return res.status(400).json({Error: "Incorrect value ",err});
        };

        req.body = value;
        next();
};

export const validateRegister = (req,res,next) =>{
        const{error,value} = validateSchema.registerSchema.validate(req.body);

        if(error){
            return res.status(400).json({Error: "Incorrect value ",error,value});
        };

        req.body = value;
        next();
};

export const validateChangePassword = (req,res,next) =>{
      const{error,value} = validateSchema.changePasswordSchema.validate(req.body);
        if(error){
            return res.status(400).json({Error: "Incorrect value ",err});
        };

        req.body = value;
        next();
}

export const checkRole = (role) =>{
    return async (req,res,next) => {
        try{   
            console.log(req.user.role)
            if(req.user.role !== role){
            return res.status(401).json({Error: "Access denide"});
        };
        next();
    
    }catch(err){
        catchError(res,err);

        };
    };
};