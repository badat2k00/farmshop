const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "category", 
      required: false,
    },
    productImage: [],
    description: {
      type: String,
      required:true
     },
     
    sellingPrice: {
     type: Number,
     required:true
    }
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
