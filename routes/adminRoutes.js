const express = require("express");
const router = express.Router();
const { upload, createFilePath } = require("../middleware/upload");
const tokenAdminAuthorisation = require("../middleware/adminAuth");

const {
  CSVFileUpload,
  createImportFilePath,
} = require("../middleware/importUsers");

const {
  register,
  login,
  forgetPassword,
  verifyOtp,
  updatePassword,
  changePassword,
  getAdminData,
  editProfile,
} = require("../controllers/adminController/adminController");

const {
  getAllUsers,
  importUsers,
  adminAuthorisedUser,
  rejectUser,
  getUser,
  addUser,
  userStatus,
  editUserProfile,
  usersCount,
  allUsersList,
} = require("../controllers/adminController/userManagement");

const {
  addAbout,
  editAbout,
  addTnC,
  editTnC,
  addPrivacyPolicy,
  editPrivacyPolicy,
  deleteSlide,
  addSlide,
  editSlide,
  getAllSlides,
  tAndC,
  privacyPolicy,
  aboutUs,
} = require("../controllers/adminController/cmsController");

const {
  addProduct,
  updateProduct,
  allProducts,
  deleteProduct,
  productStatus,
} = require("../controllers/adminController/inventoryManagement");
const {
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/adminController/CategoryAndSubCategoryController");
router.post("/register", createFilePath, upload.any(), register);

router.post("/login", login);

router.get("/getAdminData", tokenAdminAuthorisation, getAdminData);

router.post("/forgetPassword", forgetPassword);

router.post("/verifyOtp", verifyOtp);

router.post("/updatePassword", updatePassword);

router.post("/changePassword", tokenAdminAuthorisation, changePassword);

router.post("/editProfile", tokenAdminAuthorisation, upload.any(), editProfile);

// User Management

router.post("/allUsersList", tokenAdminAuthorisation, allUsersList);

router.get("/usersCount", tokenAdminAuthorisation, usersCount);

router.post("/getUser/:_id", tokenAdminAuthorisation, getUser);

router.post(
  "/adminAuthorisedUser/:_id",
  tokenAdminAuthorisation,
  adminAuthorisedUser
);

router.post("/rejectUser/:_id", tokenAdminAuthorisation, rejectUser);

router.post("/userStatus/:_id", tokenAdminAuthorisation, userStatus);

router.post(
  "/importUsers",
  createImportFilePath,
  CSVFileUpload.any(),
  importUsers
);

router.post(
  "/addUser",
  createFilePath,
  upload.any(),
  tokenAdminAuthorisation,
  addUser
);

router.post("/editUserProfile/:_id", upload.any(), editUserProfile);

// Content Management

router.post("/cms/addSlide", tokenAdminAuthorisation, upload.any(), addSlide);

router.post(
  "/cms/editSlide/:_id",
  tokenAdminAuthorisation,
  upload.any(),
  editSlide
);

router.get("/cms/getAllSlides", tokenAdminAuthorisation, getAllSlides);

router.post("/cms/deleteSlide/:_id", tokenAdminAuthorisation, deleteSlide);

router.post("/cms/addAbout", tokenAdminAuthorisation, addAbout);

router.post("/cms/editAbout", tokenAdminAuthorisation, editAbout);

router.post("/cms/addTnC", tokenAdminAuthorisation, addTnC);

router.post("/cms/editTnC", tokenAdminAuthorisation, editTnC);

router.post("/cms/addPrivacyPolicy", tokenAdminAuthorisation, addPrivacyPolicy);

router.post(
  "/cms/editPrivacyPolicy",
  tokenAdminAuthorisation,
  editPrivacyPolicy
);

router.get("/cms/tAndC",tokenAdminAuthorisation, tAndC);

router.get("/cms/privacyPolicy",tokenAdminAuthorisation, privacyPolicy);

router.get("/cms/aboutUs",tokenAdminAuthorisation, aboutUs);

// Inventory management

router.post(
  "/inventory/addProduct",
  upload.any(),
  tokenAdminAuthorisation,
  addProduct
);

router.post(
  "/inventory/updateProduct",
  upload.any(),
  tokenAdminAuthorisation,
  updateProduct
);

router.post(
  "/inventory/productStatus/:_id",
  tokenAdminAuthorisation,
  productStatus
);

router.post("/inventory/allProducts", allProducts);

// Category and Sub_Category Management

router.post("/category/addCategory", upload.any(), addCategory);

router.post("/category/editCategory/:_id", upload.any(), editCategory);

router.post("/category/deleteCategory/:_id",  deleteCategory);










module.exports = router;
