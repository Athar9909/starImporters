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
  searchUser,
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
  importInventory,
} = require("../controllers/adminController/inventoryManagement");
const {
  addCategory,
  editCategory,
  deleteCategory,
  categoryStatus,
  addSubCategory,
  editSubCategory,
  getCategories,
  getSubCategories,
} = require("../controllers/adminController/CategoryAndSubCategoryController");

const {
  addBrand,
  editBrand,
  getBrands,
} = require("../controllers/adminController/brandController");

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

router.get("/searchUser",  searchUser);

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

router.get("/cms/tAndC", tokenAdminAuthorisation, tAndC);

router.get("/cms/privacyPolicy", tokenAdminAuthorisation, privacyPolicy);

router.get("/cms/aboutUs", tokenAdminAuthorisation, aboutUs);

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

router.post("/inventory/allProducts", tokenAdminAuthorisation, allProducts);

router.post(
  "/inventory/importInventory",
  tokenAdminAuthorisation,
  CSVFileUpload.any(),
  importInventory
);

// Category and Sub_Category Management

router.post(
  "/category/addCategory",
  upload.any(),
  tokenAdminAuthorisation,
  addCategory
);

router.post(
  "/category/editCategory/:_id",
  upload.any(),
  tokenAdminAuthorisation,
  editCategory
);

router.get("/category/getCategories", tokenAdminAuthorisation, getCategories);

// router.post("/category/deleteCategory/:_id", deleteCategory);

// router.post("/category/categoryStatus/:_id", categoryStatus);

router.post(
  "/subCategory/addSubCategory",
  upload.any(),
  tokenAdminAuthorisation,
  addSubCategory
);

router.post(
  "/subCategory/editSubCategory/:_id",
  upload.any(),
  tokenAdminAuthorisation,
  editSubCategory
);

router.get(
  "/subCategory/getSubCategories",
  tokenAdminAuthorisation,
  getSubCategories
);

// Brands Management

router.post(
  "/brands/addBrand",
  upload.any(),
  tokenAdminAuthorisation,
  addBrand
);

router.post(
  "/brands/editBrand/:_id",
  upload.any(),
  tokenAdminAuthorisation,
  editBrand
);

router.get("/brands/getBrands", tokenAdminAuthorisation, getBrands);

module.exports = router;
