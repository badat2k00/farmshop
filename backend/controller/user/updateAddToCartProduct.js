const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId; // ID người dùng hiện tại
    const addToCartProductId = req.body?._id; // ID sản phẩm trong giỏ hàng
    const newQuantity = req.body.quantity; // Số lượng mới từ request

    // Kiểm tra thông tin nhập vào
    if (!addToCartProductId || !newQuantity || newQuantity < 1) {
      return res.status(400).json({
        message: "Vui lòng cung cấp thông tin hợp lệ (ID và số lượng >= 1).",
        error: true,
        success: false,
      });
    }

    // Tìm sản phẩm trong giỏ hàng
    const cartProduct = await cartModel.findOne({
      _id: addToCartProductId,
      userId: currentUserId,
    });

    if (!cartProduct) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm trong giỏ hàng.",
        error: true,
        success: false,
      });
    }

    // Tìm sản phẩm trong kho
    const product = await productModel.findById(cartProduct.productId);
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin sản phẩm trong kho.",
        error: true,
        success: false,
      });
    }

    // Kiểm tra tồn kho
    if (newQuantity > product.stockquantity) {
      return res.status(400).json({
        message: `Không thể tăng số lượng. Số lượng tồn kho hiện tại: ${product.stockquantity}.`,
        error: true,
        success: false,
      });
    }

    // Cập nhật số lượng trong giỏ hàng
    cartProduct.quantity = newQuantity;
    await cartProduct.save();

    return res.status(200).json({
      message: "Cập nhật giỏ hàng thành công.",
      data: cartProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err?.message || "Đã xảy ra lỗi trong quá trình cập nhật.",
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
