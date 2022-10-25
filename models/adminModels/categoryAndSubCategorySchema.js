const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
},{timestamps:true},{collection:"Category"})

const Category  = mongoose.model("Category",categorySchema)


const subCategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
},{timestamps:true},{collection:"Sub_Category"})

const Sub_Category = mongoose.model("Sub_Category",subCategorySchema)


module.exports = {Category,Sub_Category}
