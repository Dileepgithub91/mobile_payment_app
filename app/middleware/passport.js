const {userServices} =require("../services")
require('dotenv').config();

const  { Strategy:JwtStrategy,ExtractJwt } = require('passport-jwt');

const jwtOptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
} 

const jwtVerify = async(payload,done)=>{
    console.log("jwt Strategy startted");
    console.log("payload"+payload.sub);
    try{
        // const jwtTokenFromUser =ExtractJwt.fromAuthHeaderAsBearerToken();
        //check whether the token is in database
        //if not match deny say logout from others
        //current ipaddress and device type check and match

        const {user,token} = await userServices.getUserByUserId(payload.sub);
        // if(token.token!==jwtTokenFromUser){
        //     console.log("User token does not match,LogOut From Other device then Login again");
        //     return done(null,false)
        // }
        if(!user){
            return done(null,false)
        }
        done(null,user) 
    } catch(error){
        done(error,false)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions,jwtVerify);

module.exports = {
    jwtStrategy
}