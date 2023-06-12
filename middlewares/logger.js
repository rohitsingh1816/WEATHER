const winston= require("winston")
const {mongoDB} = require("winston-mongodb")
const { MongoDB } = require("winston/lib/winston/transports")

const logger= winston.createLogger({
    level:"info",
    format: winston.format.json(),
    transports:[
        new MongoDB({
            db:process.env.MONGO_URL,
            collection: "logs",
            options: {
                useUnifiedTopology:true
            }
        })
    ]
})

module.exports= logger