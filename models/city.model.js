const mongoose= require("mongoose")

const userCities = mongoose.Schema({
    userId: {type: mongoose.schema.Types.ObjectId,
    ref:"user",required:true},
    previousSearches: [{type:String,required:true}]
})

const userCitiesList= mongoose.model("cities",userCities)

module.exports= userCitiesList