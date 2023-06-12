const jwt= require("jsonwebtoken")
const redisClient = require("../helpers/redis")

const authenticator= async(req,res,next) =>{
    try{
        const token= req.headers?.authorization?.split("")[1]

        if(!token) return res.status(401).send("login again")

        const isTokenValid= await jwt.verify(token,process.env.JWT_SECRET)

        if(!isTokenValid) return res.send("authentication failed, login again")

        const isTokenBlacklisted = await redisClient.get(token)

        if(isTokenBlacklisted) return res.send("unauthorized")

        req.body.userId= isTokenValid.userId
        req.body.preferred_city= isTokenValid.preferred_city

        next()
    }
    catch(err){
        res.send(err.message)
    }


}

module.exports= {authenticator}