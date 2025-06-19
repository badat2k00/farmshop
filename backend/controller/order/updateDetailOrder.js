const orderModel = require("../../models/orderModel");
const fetchOrderByUser = require("../order/getOrdersbyUser");
let  moment =require("moment")
async function updateOrderDetail(req, res, next) {
   
  const currentUser = req.userId;
  const { shippingAddress, phoneNumber, customerName, detail, orderId } =
    req.body;

  try {

    const order = await orderModel.findOne({ _id: orderId, userId: currentUser, status: "pending" });
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
      });
    }

    const orderTime = moment(order.orderDate);
    const currentTime = moment();

    // Tính sự khác biệt giữa thời gian hiện tại và thời gian đơn hàng
    const timeDifference = currentTime.diff(orderTime, 'minutes'); // Đo thời gian theo phút

    console.log("Time difference in minutes:", timeDifference);
    if (timeDifference > 60) {

      return res.status(400).json({
        message: "Bạn chỉ có thể sửa đơn hàng trong 1 giờ sau khi đặt hàng thành công",
        error: true,
        success:false,
      });
    }
   
    const updatedOrder = await orderModel.findOneAndUpdate(
      { _id: orderId, userId: currentUser, status: "pending" },
      {
        shippingAddress,
        phoneNumber,
        customerName,
        detail,
      },
      {new:"true"}
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
        error: true,
        success: false,
      });
    }

   
    res.json({
      data: updatedOrder,
      message: "Đơn hàng đã được cập nhật thành công",
      error: false,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = updateOrderDetail;
