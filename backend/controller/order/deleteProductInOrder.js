
const orderModel = require("../../models/orderModel");
const deleteProductInOrder = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req.body.productId;
    const order = await orderModel.findOne({
      status: "pending",
      userId: currentUser,
    });
    // const updateItems = await order.deleteOne({ _id: addToCartProductId });

    let deleteProduct=order.items.filter(item=>item.productId==productId)
    let newItems=order.items.filter(item=>item.productId!==productId)
    order.totalAmount = order.totalAmount - (deleteProduct[0].sellingPrice * deleteProduct[0].quantity);
    if(order.totalAmount>0){
    order.items=newItems
    await order.save()
  }
  else{
    await orderModel.deleteOne({_id:order._id})
  }
    // cập nhật lại cái order sau khi xóa sp
    res.json({
      message: "Product Deleted From Order",
      error: false,
      success: true,
      data: order,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteProductInOrder;
