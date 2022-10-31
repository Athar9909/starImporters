const {
  Category,
  Sub_Category,
} = require("../../models/adminModels/categoryAndSubCategorySchema");
const { success, error } = require("../../service_response/userApiResponse");

// Add new Category
exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res
      .status(201)
      .json(error("Please provide category name", res.statusCode));
  }
  try {
    if (req.files.length == 0) {
      return res
        .status(201)
        .json(error("Please provide category Image", res.statusCode));
    }
    const verifyCategory = await Category.findOne({categoryName:categoryName})
    if(verifyCategory){
      return res.status(201).json(error("Category is already added",res.statusCode))
    }
    const category = new Category({
      categoryName: categoryName,
    });
    if (req.files.length > 0) {
      const arr = req.files[0].path.split("\\");
      const categoryImage = `${arr[1]}\\${arr[2]}`;
      category.categoryImage = categoryImage;
    }
    await category.save();
    res.status(201).json(success(res.statusCode, "Category added", category));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in adding Category", res.statusCode));
  }
};

// Edit Category
exports.editCategory = async (req, res) => {
  const { categoryName } = req.body;
  console.log(req.files);
  try {
    const editCategory = await Category.findById(req.params._id);
    if (categoryName) {
      editCategory.categoryName = categoryName;
    }
    if (req.files.length > 0) {
      if (req.files[0].fieldname == "categoryImage") {
        const arr = req.files[0].path.split("\\");
        // console.log(arr);
        const categoryImage = `${arr[1]}\\${arr[2]}`;
        editCategory.categoryImage = categoryImage;
      }
    }
    await editCategory.save();
    res
      .status(201)
      .json(success(res.statusCode, "Modified Successfully", editCategory));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in Modifying Category", res.statusCode));
  }
};

// Get Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json(success(res.statusCode, "Categories", categories));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in fetching categories", res.statusCode));
  }
};

// // Delete Category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const del = await Category.findByIdAndDelete(req.params._id);
//     res
//       .status(201)
//       .json(success(res.statusCode, "category Deleted Successfully", del));
//   } catch (err) {
//     console.log(err);
//     res.status(401).json(error("Error in deletion", res.statusCode));
//   }
// };

// //Enable or Disable category
// exports.categoryStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updateStatus = await Category.findById(req.params._id);
//     updateStatus.status = status;
//     res
//       .status(201)
//       .json(success(res.statusCode, "Status Updated", updateStatus));
//   } catch (err) {
//     console.log(err);
//     res.status(401).json(error("Error in updating status"));
//   }
// };

// Add Sub Category
exports.addSubCategory = async (req, res) => {
  const { categoryName, subCategoryName } = req.body;
  // console.log(req.body);
  // console.log(req.files);
  if (!categoryName) {
    return res
      .status(201)
      .json(error("Please provide category name", res.statusCode));
  }
  if (!subCategoryName) {
    return res
      .status(201)
      .json(error("Please provide Sub category name", res.statusCode));
  }
  try {
    if (req.files.length == 0) {
      return res
        .status(201)
        .json(error("Please provide Sub category Image", res.statusCode));
    }
    const verifySubcategory = await Sub_Category.findOne({subCategoryName:subCategoryName})
    if(verifySubcategory){
      return res.status(201).json(error("Sub Category is already exist",verifySubcategory))
    }
    const subCategory = new Sub_Category({
      categoryName: categoryName,
      subCategoryName: subCategoryName,
    });
    if (req.files.length > 0) {
      const arr = req.files[0].path.split("\\");
      const subCategoryImage = `${arr[1]}\\${arr[2]}`;
      subCategory.subCategoryImage = subCategoryImage;
    }
    await subCategory.save();
    res
      .status(201)
      .json(success(res.statusCode, "Sub Category added", subCategory));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in adding Sub Category", res.statusCode));
  }
};

// Edit Sub Category
exports.editSubCategory = async (req, res) => {
  const { subCategoryName } = req.body;
  // console.log(req.body);
  // console.log(req.files);
  try {
    const edit = await Sub_Category.findById(req.params._id);
    if (subCategoryName) {
      edit.subCategoryName = subCategoryName;
    }
    if (req.files.length > 0) {
      const arr = req.files[0].path.split("\\");
      const subCategoryImage = `${arr[1]}\\${arr[2]}`;
      edit.subCategoryImage = subCategoryImage;
    }
    await edit.save();
    res
      .status(201)
      .json(success(res.statusCode, "Sub Category Modified", edit));
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json(error("Error in Modifying Sub Category", res.statusCode));
  }
};

// Get sub Categories
exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await Sub_Category.find().populate("categoryName");
    // const nnn = subCategories._id
    // console.log();
    // for (const iterator of subCategories) {
    //   console.log(iterator.categoryName.categoryName);
    // }
    res
      .status(201)
      .json(success(res.statusCode, "Sub Categories", subCategories));
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json(error("Error in fetching Sub categories", res.statusCode));
  }
};
