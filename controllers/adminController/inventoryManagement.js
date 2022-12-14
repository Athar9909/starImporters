const { success, error } = require("../../service_response/userApiResponse");
const UnitProduct = require("../../models/adminModels/unitProduct");
const csv = require("csvtojson");

exports.addProduct = async (req, res) => {
  const {
    unitName,
    category,
    subCategory,
    flavour,
    description,
    quantity,
    brand,
    productType,
  } = req.body;
  try {
    if (
      !unitName ||
      !category ||
      !subCategory ||
      !flavour ||
      !description ||
      !quantity ||
      !brand ||
      !productType
    ) {
      return res
        .status(201)
        .json(error("Please enter all details", res.statusCode));
    }
    const newProduct = new UnitProduct({
      unitName: unitName,
      description: description,
      category: category,
      subCategory: subCategory,
      flavour: flavour,
      quantity: quantity,
      brand: brand,
      productType: productType,
    });

    for (let i = 0; i < req.files.length; i++) {
      if (req.files[i].fieldname == "productImage") {
        const arr = req.files[i].path.split("\\");
        const productImage = `${arr[1]}\\${arr[2]}`;
        newProduct.productImage = productImage;
      }
      if (req.files[i].fieldname == "flavourImage") {
        const arr = req.files[i].path.split("\\");
        const flavourImage = `${arr[1]}\\${arr[2]}`;
        newProduct.flavourImage = flavourImage;
      }
    }
    await newProduct.save();
    res
      .status(201)
      .json(success(res.statusCode, "Product Added Successfully", newProduct));
    // console.log(newProduct);
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json(error("Please enter valid Details of product", res.statusCode));
  }
};

// Update prduct
exports.updateProduct = async (req, res) => {
  const {
    unitName,
    description,
    category,
    subCategory,
    brand,
    flavour,
    quantity,
    productType,
  } = req.body;
  //   console.log(req.body);
  // console.log(req.files);
  try {
    if (!unitName) {
      return res
        .status(201)
        .json(error("Please provide product name", res.statusCode));
    }
    const updated = await UnitProduct.findById(req.params._id);
    if (description) updated.description = description;
    if (category) updated.category = category;
    if (subCategory) updated.subCategory = subCategory;
    if (brand) updated.brand = brand;
    if (flavour) updated.flavour = flavour;
    if (quantity) updated.quantity = quantity;
    if (productType) updated.productType = productType;

    for (let i = 0; i < req.files.length; i++) {
      if (req.files[i].fieldname == "productImage") {
        const arr = req.files[i].path.split("\\");
        const productImage = `${arr[1]}\\${arr[2]}`;
        updated.productImage =productImage
      }
      if (req.files[i].fieldname == "flavourImage") {
        const arr = req.files[i].path.split("\\");
        const flavourImage = `${arr[1]}\\${arr[2]}`;
        updated.flavourImage = flavourImage;
      }
    }

    await updated.save();

    res
      .status(201)
      .json(success(res.statusCode, "Successfully Updated", updated));
  } catch (err) {
    console.log(err);
    res
      .status(201)
      .json(
        error(
          "Trouble in updating please provide right credential",
          res.statusCode
        )
      );
  }
};

// Get all Products
exports.allProducts = async (req, res) => {
  const { from, to } = req.body;
  let myArr = from.split("/");
  const newFrom = `${myArr[2]}-${myArr[1]}-${myArr[0]}`;
  let myArr2 = to.split("/");
  const newTo = `${myArr2[2]}-${myArr2[1]}-${myArr2[0]}`;
  console.log(newFrom, newTo);
  try {
    if (!from || !to) {
      const products = await UnitProduct.find();
      res.status(201).json(success(res.statusCode, "All Product", products));
    } else {
      const products = await UnitProduct.find({
        createdAt: {
          $gte: newFrom,
          $lte: newTo,
        },
      });
      res.status(201).json(success(res.statusCode, "All Product", products));
    }
    // console.log(products);
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in finding Document", res.statusCode));
  }
};

// Enable or disable product
exports.productStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const product = await UnitProduct.findById(req.params._id).select("status");
    product.status = status;
    if (product.status == true) {
      return res
        .status(201)
        .json(success(res.statusCode, "Product Enabled Successfully", product));
    }
    if (product.status == false) {
      return res
        .status(201)
        .json(
          success(res.statusCode, "Product Disabled Successfully", product)
        );
    }
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in status update", res.statusCode));
  }
};

// exports.deleteProduct = async (req, res) => {
//   const { unitName } = req.body;
//   try {
//     if (!unitName) {
//       return res
//         .status(201)
//         .json(error("Please Provide Name of the product", res.statusCode));
//     }
//     const product = await UnitProduct.findOneAndDelete({ unitName: unitName });
//     res
//       .status(201)
//       .json(success(res.statusCode, "Deletion Successfull", product));
//   } catch (err) {
//     console.log(err);
//     res.status(401).json(error("Error in Deletion", res.statusCode));
//   }
// };

// Import Inventory
exports.importInventory = async (req, res) => {
  if (req.files.length == 0 || !req.files) {
    return res
      .status(201)
      .json(error("Please upload Inventory File", res.statusCode));
  }
  try {
    const inventoryFile = req.files[0].path;
    const jsonArray = await csv().fromFile(inventoryFile);
    const inventory = await UnitProduct.insertMany(jsonArray);
    // console.log(inventory);
    res
      .status(201)
      .json(success(res.statusCode, "Imported Successfully", inventory));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in Importing Inventory", res.statusCode));
  }
};
