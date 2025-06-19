
const productModel = require("../../models/productModel");
const categoryModel = require("../../models/categoryModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];  // Danh sách các categoryName


    // Kiểm tra nếu categoryList là string, chuyển thành mảng
    if (typeof categoryList === 'string') {
      categoryList = [categoryList];
    }

    // Lọc theo categoryName (lấy categoryId từ bảng categoryModel)
    const categories = await categoryModel.find({
      categoryName: { "$in": categoryList },
    });

    // Tạo một mảng các categoryId từ các category tìm được
    const categoryIds = categories.map(category => category._id);

    // Điều kiện lọc sản phẩm
    const filterConditions = {};

    // Nếu có categoryId, thêm vào điều kiện lọc
    if (categoryIds.length > 0) {
      filterConditions.categoryId = { "$in": categoryIds }; // Sử dụng categoryId thay vì categoryName
    }

    // Truy vấn sản phẩm theo điều kiện lọc
    const product = await productModel.find(filterConditions);

    res.json({
      data: product,
      message: "Products fetched successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
