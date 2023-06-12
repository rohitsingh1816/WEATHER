const express= require("express")
const connection = require("./config/db")

const {userRouter} = require("./routes/city.route")

const redisClient= require("./helpers/redis")

const logger= require("./middlewares/logger")
require("dotenv").config()

const PORT= process.env.PORT || 5500

const app= express()
app.use(express.json())

app.get("/",async(req,res)=>{
    res.send(await redisClient.get("name"))
})

app.use("/api/user", userRouter)
app.use("/api/weather", cityRouter)

app.listen(PORT,async()=>{
    try{
        await connection()
        console.log("connected")
        logger.log("info","db connect")
    }catch(err){
        console.log(err.message)
        logger.log("error","no connect")
    }
    console.log("runnuing", PORT)
})