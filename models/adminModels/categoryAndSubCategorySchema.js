const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
},{timestamps:true},{collection:"Category"})

const Category  = mongoose.model("Category",categorySchema)


const subCategorySchema = mongoose.Schema({
    categoryName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    subCategoryName:{
        type:String,
        required:true
    },
    subCategoryImage:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
},{timestamps:true},{collection:"Sub_Category"})

const Sub_Category = mongoose.model("Sub_Category",subCategorySchema)


module.exports = {Category,Sub_Category}
