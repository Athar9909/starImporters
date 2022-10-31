const mongoose = require("mongoose");

const unitProductSchema = mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Sub_Category",
      required: true
    },
    brand: {
      type: String,
      // required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
    },
    flavourImage: {
      type: String,
    },
    flavour: {
      type: String,
      // required: true,
    },
    productType: {
      type: String,
      // required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
  { collection: "UnitProduct" }
);

const UnitProduct = mongoose.model("UnitProduct", unitProductSchema);

module.exports = UnitProduct;
