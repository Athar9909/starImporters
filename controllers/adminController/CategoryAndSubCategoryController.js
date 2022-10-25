const {
  Category,
  Sub_Category,
} = require("../../models/adminModels/categoryAndSubCategorySchema");
const { success, error } = require("../../service_response/userApiResponse");

// Add new Category
exports.addCategory = async (req, res) => {
  const { name } = req.body;
  if(!name){
    return res.status(201).json(error("Please provide category name",res.statusCode))
  }
  try {
      if(req.files.length==0){
          return res.status(201).json(error("Please provide category Image",res.statusCode))
      }
    const category = new Category({
        name: name,
    });
    if (req.files.length > 0) {
      const image = req.files[0].path;
      category.image = image
    }
    await category.save();
    res.status(201).json(success(res.statusCode,"Category added",category))
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in adding Category",res.statusCode))
  }
};


// Edit Category
exports.editCategory = async(req,res)=>{
    const {name} = req.body
    try {
        const editCategory = await Category.findById(req.params._id)
        if(name){
            editCategory.name = name
        }
        if(req.files.length>0){
            if(req.files[0].fieldname =="image"){
                editCategory.image = `${req.files[0].destination.replace("./public/images")}/${req.files[0].filename}`
            }
        }
        await editCategory.save()
        res.status(201).json(success(res.statusCode,"Modified Successfully",editCategory))
    } catch (err) {
        console.log(err);
        res.status(401).json(error("Error in Modifying Category",res.statusCode))
    }
}


// Delete Category
exports.deleteCategory = async(req,res)=>{
    try {
        const del = await Category.findByIdAndDelete(req.params._id)
        res.status(201).json(success(res.statusCode,"category Deleted Successfully",del))
    } catch (err) {
        console.log(err);
        res.status(401).json(error("Error in deletion",res.statusCode))
    }
}