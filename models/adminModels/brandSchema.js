const mongoose = require("mongoose")

const brandSchema = mongoose.Schema({
    brandName :{
        type:String,
        required:true
    },
    brandImage:{
        type:String
    }
},{timestamps:true},{collection:"Brand"})

const Brand = mongoose.model("Brand",brandSchema)

module.exports = Brand