import * as authService from "../services/auth.service.js";
import * as bcrypt from "../utils/bcrypt.js"
import * as token from "../utils/token.js";
import prisma from "../lib/prisma.js";
import catchError from "../utils/error.js";



export const registerUser = async(req,res) =>{
    try{
        const {name,email,password} = req.body;

        const existEmail = await authService.checkEmail(email);

        if(existEmail){
            return res.status(409).json({Error: "A user with this email already exists"});
        };

        const hashPassword = await bcrypt.hashPassword(password);

        const newUser = await authService.createUser({name,email,hashPassword});

        const {accessToken,refreshToken} = await token.generateToken({userId: newUser.id,role:newUser.role});
        await token.setRefreshToken(res,"refreshToken",refreshToken);
        res.status(201).json({Message:"User Created",newUser,accessToken});
    }catch(err){
        catchError(res,err);
    };
};

export const login = async(req,res) =>{
    try{
        const{email,password} = req.body;

        const existUser = await authService.checkEmail(email);

        if(!existUser){
            return res.status(401).json({Error: "Email not found"});
        };

        const matchPassword = await bcrypt.comparePassword(password,existUser.password);

        if(!matchPassword){
            return res.status(401).json({Error: "Incorrect paswword"});
        };

        const{accessToken,refreshToken} = await token.generateToken({userId: existUser.id, role: existUser.role});

        token.setRefreshToken(res,"refreshToken",refreshToken);

        res.status(200).json({Message: "Entry allowed",accessToken});
    }catch(err){
        catchError(res,err);
    };
};

export const profileUser = async(req,res) =>{
    try{
        const userId = req.user.id;
        
        const user = await authService.findUserById(userId);

        res.status(200).json({Message: "Profile available",user});

    }catch(err){
        catchError(res,err);
    };
};

export const refresh = async(req,res) =>{
    try{
        const authHeader = req.cookies.refreshToken;

        const checkToken = token.verifyRefreshToken(authHeader);

        if(!checkToken){
            return res.status(401).json({Error: "Invalid token"});
        };

        const{accessToken,refreshToken} = token.generateToken({userId:checkToken.userId,role:checkToken.role});

        token.setRefreshToken(res,"refreshToken",refreshToken);

        res.status(200).json({Message: "Access token refreshed",accessToken});
    }catch(err){
        catchError(res,err);
    };
};

export const changePassword = async(req,res) =>{
    try{
        const {oldPassword,currentPassword} = req.body;

        const userId = req.user.id;

        const user = await authService.findUserById(userId);

        console.log(user);

        if(!user){
            return res.status(401).json({Error: "User not found"});
        };

        const matchPassword = await bcrypt.comparePassword(oldPassword,user.password);

               console.log(matchPassword)

        if(!matchPassword){
            return res.status(401).json({Error: "Incorrect password"});
        };

        const hashedPassword = await bcrypt.hashPassword(currentPassword);

        await prisma.user.update({
            where:{id:userId},
            data:{
                password:hashedPassword
            }
        });
        res.status(200).json({Message: "Password changed",currentPassword});
    }catch(err){
        catchError(res,err);
    };
};

export const logout = async(req,res) =>{
    try{
        res.clearCookie("refreshToken");
        res.status(200).json({Message:"succesfully logout"});
    }catch(err){
        catchError(res,err);
    };
};
