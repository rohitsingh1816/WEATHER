const redisClient= require ("../helpers/redis")
const axios= require("axios")

const userCitiesList= require("../models/city.model")

const API_KEY= process.env.OW_API_KEY

const getCityData= async(req,res) =>{
    try{
        const city= req.params.city || req.body.preffered_city

        const isCityInCatch = await redisClient.get(`${city}`)

        console.log(isCityInCatch)

        if(isCityInCatch) return
        res.status(200).send({data: isCityInCatch})

        const response = await axios.get(`https:api.weatherapi.com/v1/current.json?key=${API_KEY}&{city}`)

        const weatherData= response.data

        redisClient.set(city,JSON.stringify(weatherData),{EX:30 * 60})

        await userCitiesList.findOneAndUpdate ({userId: req.body.userId},
            {
                userId: req.body.userId, $push:
            {previousSearches:city}}, {
                new:true,upsert:true,
                setDefaultsOnInsert:true
            })

            return res.send({ data: weatherData})
        } catch (err) {
            return res.status(500).send(err.message)
        }
    }

    module.exports= {getCityData,mostSearchedCity}