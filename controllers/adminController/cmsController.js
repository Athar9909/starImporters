const { error, success } = require("../../service_response/userApiResponse");
const {
  HomeBanner,
  About,
  TermsAndConditions,
  PrivacyPolicy,
} = require("../../models/adminModels/cmsSchema");

// Adding Slides
exports.addSlide = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res
      .status(201)
      .json(error("Please upload Banner Image", res.statusCode));
  }
  if (!description) {
    return res
      .status(201)
      .json(error("Please upload Banner Image", res.statusCode));
  }
  if (req.files.length == 0) {
    return res
      .status(201)
      .json(error("Please upload Banner Image", res.statusCode));
  }
  try {
    const counter = (await HomeBanner.find().count()) + 1;
    // console.log(counter);
    const arr = req.files[0].path.split("\\");
    const banner = `${arr[1]}\\${arr[2]}`;
    // const banner = req.files[0].path
    const add = new HomeBanner({
      slide: `Slide${counter}`,
      title: title,
      description: description,
      banner: banner,
    });
    // add.$inc("slideNum",1)
    await add.save();
    res
      .status(201)
      .json(success(res.statusCode, "Slide one added Successfully", add));
  } catch (err) {
    console.log(err);
    res.status(201).json(error("Error in adding Slide One", res.statusCode));
  }
};

// Edit Slides
exports.editSlide = async (req, res) => {
  const { title, description } = req.body;
  try {
    const edit = await HomeBanner.findById(req.params._id);
    if (title) edit.title = title;
    if (description) edit.description = description;
    if (req.files.length > 0) {
      const arr = req.files[0].path.split("\\");
      const banner = `${arr[1]}\\${arr[2]}`;
      edit.banner = banner;
    }
    // console.log(`${req.files[0].destination.replace("/public/images")}/${
    //   req.files[0].filename
    // }`);
    // await edit.save();
    res
      .status(201)
      .json(success(res.statusCode, "Slide Modified Successfully", edit));
  } catch (err) {
    console.log(err);
    res.status(201).json(error("Error in modifying Slide One", res.statusCode));
  }
};

// Delete Slides except slide 1
exports.deleteSlide = async (req, res) => {
  try {
    const deleteSlide = await HomeBanner.findById(req.params._id);
    if (deleteSlide.slide == "Slide1") {
      return res
        .status(201)
        .json(error("You are not allowed to delete Slide 1", res.statusCode));
    }
    await deleteSlide.delete();
    res
      .status(201)
      .json(success(res.statusCode, "Deletion Successful", deleteSlide));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in slide deletion", res.statusCode));
  }
};

//Get all the slides
exports.getAllSlides = async (req, res) => {
  try {
    const slides = await HomeBanner.find();
    res.status(201).json(success(res.statusCode, "Slides", slides));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error in fetching Slides", res.statusCode));
  }
};

// Adding -> About Us
exports.addAbout = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res
      .status(201)
      .json(error(`Please provide "About Us" content`, res.statusCode));
  }
  try {
    const add = new About({
      description: description,
    });
    const added = await add.save();
    res
      .status(201)
      .json(success(res.statusCode, `"About Us" added successfully`, added));
  } catch (err) {
    console.log(err);
    res.status(401).json(error(`Error in adding "About Us"`, res.statusCode));
  }
};

// Edit about Us
exports.editAbout = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res
      .status(201)
      .json(error(`Please provide "About Us" content`, res.statusCode));
  }
  try {
    const edit = await About.findOne({ title: "AboutUs" });
    // console.log(edit);
    edit.description = description;
    await edit.save();
    res
      .status(201)
      .json(success(res.statusCode, "Modified Successfully", edit));
  } catch (err) {
    console.log(err);
    res.status(401).json(error(`Error -> "About US"`));
  }
};

//Get About Us
exports.aboutUs = async (req, res) => {
  try {
    const about = await About.find();
    res.status(201).json(success(res.statusCode, "About Us", about));
  } catch (err) {
    console.log(err);
    res.status(401).json(error("Error fetching About Us", res.statusCode));
  }
};

// Adding -> Terms and Conditions
exports.addTnC = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res
      .status(201)
      .json(
        error(`Please provide "Terms and Conditions" content`, res.statusCode)
      );
  }
  try {
    const add = new TermsAndConditions({
      description: description,
    });
    const added = await add.save();
    res
      .status(201)
      .json(
        success(
          res.statusCode,
          `"Terms and Conditions" added successfully`,
          added
        )
      );
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json(error(`Error in adding "Terms and Conditions"`, res.statusCode));
  }
};

// Edit terms and Condition
exports.editTnC = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res
      .status(201)
      .json(
        error(`Please provide "Terms and Conditions" content`, res.statusCode)
      );
  }
  try {
    const edit = await TermsAndConditions.findOne({ title: "TnC" });
    // console.log(edit);
    edit.description = description;
    await edit.save();
    res
      .status(201)
      .json(
        success(
          res.statusCode,
          `"Terms and Conditions" Modified Successfully`,
          edit
        )
      );
  } catch (err) {
    console.log(err);
    res.status(401).json(error(`Error -> "Terms and Conditions"`));
  }
};

// Get Terms and Conditions
exports.tAndC = async (req, res) => {
  try {
    const tnC = await TermsAndConditions.find();
    res.status(201).json(success(res.statusCode, "Terms and Conditions", tnC));
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json(error("Error fetching Terms and Conditons", res.statusCode));
  }
};

// Adding -> Privacy Policy
exports.addPrivacyPolicy = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res
      .status(201)
      .json(error(`Please provide "Privacy Policy" content`, res.statusCode));
  }
  try {
    const add = new PrivacyPolicy({
      description: description,
    });
    const added = await add.save();
    res
      .status(201)
      .json(
        success(res.statusCode, `"Privacy Policy" added successfully`, added)
      );
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json(error(`Error in adding "Privacy Policy"`, res.statusCode));
  }
};

// Edit Privacy Policy
exports.editPrivacyPolicy = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res
      .status(201)
      .json(error(`Please provide "Privacy Policy" content`, res.statusCode));
  }
  try {
    const edit = await PrivacyPolicy.findOne({ title: "PrivacyPolicy" });
    // console.log(edit);
    edit.description = description;
    await edit.save();
    res
      .status(201)
      .json(
        success(res.statusCode, `"Privacy Policy" Modified Successfully`, edit)
      );
  } catch (err) {
    console.log(err);
    res.status(401).json(error(`Error -> "Privacy Policy"`));
  }
};

// Get Privacy Policy
exports.privacyPolicy = async (req, res) => {
  try {
    const pp = await PrivacyPolicy.find();
    res.status(201).json(success(res.statusCode, "Privacy Policy", pp));
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json(error("Error in fetching Privacy Policy", res.statusCode));
  }
};
