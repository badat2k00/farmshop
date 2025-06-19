const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;
    
    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
    const isProductAvailable = await cartModel.findOne({ productId, userId: currentUser });
    const product = await productModel.findById(productId);

    
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại.",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
    };
    const newAddToCart = new cartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.status(200).json({
      data: saveProduct,
      message: "Sản phẩm đã được thêm vào giỏ hàng.",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err?.message || "Đã xảy ra lỗi.",
      error: true,
      success: false,
    });
  }
};

module.exports = addProductToCart;
