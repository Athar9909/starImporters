const Brand = require("../../models/adminModels/brandSchema");
const { error, success } = require("../../service_response/userApiResponse");

// Add Brand
exports.addBrand = async (req, res) => {
  const { brandName } = req.body;
  // console.log(req.body);
  // console.log(req.files);
  if (!brandName) {
    return res
      .status(201)
      .json(error("Please provide brand name", res.statusCode));
  }
  if (!req.files) {
    return res.status(201).json(error("Please upload brand Image"));
  }
  try {
    const brand = new Brand({
      brandName: brandName,
    });
    if (req.files.length > 0) {
      brand.brandImage = req.files[0].path;
    }
    await brand.save();
    res
      .status(201)
      .json(success(res.statusCode, "Brand Added Successfully", brand));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in adding brand", res.statusCode));
  }
};

//Edit brands
exports.editBrand = async (req, res) => {
  const { brandName } = req.body;
  try {
    const edit = await Brand.findById(req.params._id);
    if (brandName) edit.brandName = brandName;
    if (req.files.length > 0) {
      edit.brandImage = `${req.files[0].destination.replace("/public/image")}/${
        req.files[0].filename
      }`;
    }
    await edit.save();
    res
      .status(201)
      .json(success(res.statusCode, "Modified Successfullt", edit));
  } catch (err) {
    console.log(err);
    res.status(201).json(error("Error in modifying", res.statusCode));
  }
};


// Get all brands
exports.getBrands = async(req,res)=>{
    try {
        const brands = await Brand.find()
        res.status(201).json(success(res.statusCode,"Brands",brands))
    } catch (err) {
        console.log(err);
        res.status(401).json(error("Error in fetching brands",res.statusCode))
    }
}