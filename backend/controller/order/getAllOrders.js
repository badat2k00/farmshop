const orderModel = require("../../models/orderModel");
async function getAllOrders(req, res) {
  try {
    const allOrders = await orderModel.find().sort({orderDate:-1})
    res.json({
      data: allOrders,
      message: "All Order ",
      error: false,
      success: true,
    });
  } catch (e) {
    res.json({
      message: e?.message || e,
      error: true,
      success: false,
    });
  }
}
module.exports = getAllOrders;
