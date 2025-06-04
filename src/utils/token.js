import jwt from "jsonwebtoken";

export const generateToken = (payload) =>{
    const accessToken = jwt.sign(payload,process.env.ACCESS_SECRET,{expiresIn: "1d"});
    const refreshToken = jwt.sign(payload,process.env.REFRESH_SECRET,{expiresIn:"7d"});

    return{accessToken,refreshToken};
};

export const verifyAccessToken = (accessToken) =>{
    return jwt.verify(accessToken,process.env.ACCESS_SECRET);
};

export const verifyRefreshToken = (refreshToken) =>{
    return jwt.verify(refreshToken,process.env.REFRESH_SECRET);
};

export const setRefreshToken = async (res,typeCookie,token) => {
    return await res.cookie(typeCookie,token,{
        httpOnly:true,
        secure:true,
        sameSite:"Strict",
        maxAge: 7*24*60*60*1000
    });
};



