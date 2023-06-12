const redis= require("redis")

const ioredis= require("ioredis")

const redisClient= redis.createClient()

//redis connection

 redisClient.on("connect",async() =>{
 console.log("redis connected")
})


//error message
redisClient.on("error",(err) =>{
    console.log(err.message)
})

redisClient.connect()

module.exports= redisClient