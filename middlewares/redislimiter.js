const redisClient= require("../helpers/redis")

const redisLimiter= async(req,res,next) =>{
    const bool= await redisClient.exists(req.ip)

    if(bool===1) {
        let noreq= await redisClient.get(req.ip)
        noreq= +noreq


        if(noreq<3){
            redisClient.incr(req.ip)
            next()
        } else if(noreq===3){
            redisClient.expire(req.ip,60)

            return res.send("maximum request,try after 1min")
        } else{
            return res.send("maximum limit, try after 1min")
        }
    }else {
        redisClient.set(req.ip,1)
        next()
    }
}
module.exports= redisLimiter