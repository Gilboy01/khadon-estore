import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../lib/redis.js";

dotenv.config();

const generateTokens = (userId) =>{
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
       expiresIn: "15m", 
    })
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
       expiresIn: "7d", 
    })

    return {accessToken, refreshToken};
}

const storeRefreshToken = async(userId,refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7*24*60*60); //expires in 7 days
}

const setCookies = (res, accessToken, refreshToken) =>{
    //key-value
    res.cookie("accessToken", accessToken, {
        httpOnly: true, //prevents xss attacks
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict", //prevents CSRF attack
        maxAge: 15*60*1000, //milli-sec
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, //prevents xss attacks
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict", //prevents CSRF attack
        maxAge: 7*24*60*60*1000, //milli-sec
    })
};

// signup Logic
export const signup = async(req,res) =>{
    const{email, password, name} = req.body;
 try {
       const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }
    const user = await User.create({name, email, password});

    // authenticate user
    const {accessToken, refreshToken} = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({user:{
        _id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }, message:"Account created successfully"});
 } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message: error.message});
 }
};

// Login Logic
export const login = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        //comparePassword function is defined in User model
        if (user && (await user.comparePassword(password))){
           const {accessToken, refreshToken} = generateTokens(user._id);
           await storeRefreshToken(user._id, refreshToken);

           setCookies(res, accessToken, refreshToken); 

           res.status(200).json({user: {
            _id:user._id,
            name: user.name,
            email:user.email,
            role: user.role,
           },
           message: "Logged in successfully"})
        }else{
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({mesage: error.message});
    }
};

// Logout Logic
export const logout = async(req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }

};

//This will refresh the access token
export const refreshToken = async (req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message: "No refresh token provided"}); 
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);


        if(storedToken !== refreshToken){
            return res.status(401).json({message: "Invalid refresh token"});
        }

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
        
        res.cookie("accessToken", accessToken, {
        httpOnly: true, //prevents xss attacks
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict", //prevents CSRF attack
        maxAge: 15*60*1000, //15min
    });

    res.json({message: "Token refreshed successfully"});

    } catch (error) {
        console.log("Error in refresh Token conroller", error.message);
        res.status(500).json({message: "server error", error: error.message})
    }
};

//  get profile
export const getProfile = async(req,res) => {
    try {
      res.json(req.user);  
    } catch (error) {
       res.status(500).json({message: "Server error", error: error.message}); 
    }
}