const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");

const addToItemsOrder = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    // Tìm đơn hàng đang "pending"
    const order = await orderModel.findOne({
      status: "pending",
      userId: currentUser,
    }).sort({ createdAt: -1 });

    const product = await productModel.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại.",
        success: false,
        error: true,
      });
    }

    // Kiểm tra nếu sản phẩm đã hết hàng
    if (product.stockquantity <= 0) {
      return res.status(400).json({
        message: "Sản phẩm đã hết hàng.",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      productName: product.productName,
      productImage: product.productImage[0],
      category: product.category,
      quantity: 1,
      sellingPrice: product.sellingPrice,
    };

    let existingItem = order.items.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      // Kiểm tra nếu số lượng trong đơn hàng vượt quá số lượng tồn kho
      if (existingItem.quantity >= product.stockquantity) {
        return res.status(400).json({
          message: "Không thể thêm sản phẩm vào đơn hàng. Số lượng yêu cầu vượt quá số lượng tồn kho.",
          success: false,
          error: true,
        });
      }
      
      // Nếu sản phẩm còn hàng, tăng số lượng và cập nhật tổng tiền
      existingItem.quantity += 1;
      order.totalAmount += existingItem.sellingPrice;

      // Giảm số lượng tồn kho
      product.stockquantity -= 1;
      await product.save();

      await order.save();
      return res.json({
        data: order,
        success: true,
        error: false,
        message: "Sản phẩm đã được thêm vào đơn hàng",
      });
    } else {
      // Nếu sản phẩm chưa có trong đơn hàng, kiểm tra tồn kho và thêm vào đơn hàng
      if (product.stockquantity <= 0) {
        return res.status(400).json({
          message: "Sản phẩm đã hết hàng.",
          success: false,
          error: true,
        });
      }

      // Kiểm tra nếu số lượng yêu cầu vượt quá số lượng tồn kho
      if (payload.quantity > product.stockquantity) {
        return res.status(400).json({
          message: "Không thể thêm sản phẩm vào đơn hàng. Số lượng yêu cầu vượt quá số lượng tồn kho.",
          success: false,
          error: true,
        });
      }

      order.items.push(payload);
      order.totalAmount += product.sellingPrice;

      // Giảm số lượng tồn kho của sản phẩm
      product.stockquantity -= 1;
      await product.save();

      await order.save();
      return res.json({
        data: order.totalAmount,
        success: true,
        error: false,
        message: "Sản phẩm đã được thêm vào đơn hàng",
      });
    }

  } catch (err) {
    console.error(err);
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToItemsOrder;
