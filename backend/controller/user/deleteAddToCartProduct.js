const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const deletecart = async (req, res) => {
  try {
    const currentUser = req.userId; 
    const cartId = req.body._id;

    // Lấy thông tin giỏ hàng và sản phẩm
    const cartProduct = await cartModel.findOne({
      _id: cartId,
      userId: currentUser,
    });

    if (!cartProduct) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm trong giỏ hàng.",
        error: true,
        success: false,
      });
    }

    // Lấy thông tin sản phẩm trong kho
    const product = await productModel.findById(cartProduct.productId);
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm trong kho.",
        error: true,
        success: false,
      });
    }



    // Xóa sản phẩm khỏi giỏ hàng
    const deleteProduct = await cartModel.deleteOne({ _id: cartId, userId: currentUser });

    res.json({
      message: "Sản phẩm đã được xóa khỏi giỏ hàng và số lượng tồn kho đã được phục hồi.",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || "Đã xảy ra lỗi khi xóa sản phẩm.",
      error: true,
      success: false,
    });
  }
};

module.exports = deletecart;
