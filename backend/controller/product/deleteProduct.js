const productModel =require("../../models/productModel");
  // try {
  //   // Assuming 'id' is passed as a URL parameter
  //   const  productId  = req.body.productId;
  //   const result = await productModel.find({productId}).exec();

  //   // if (result.deletedCount === 0) {
  //   //   return res.status(404).json({
  //   //     message: "Product not found",
  //   //     success: false,
  //   //     error: true
  //   //   });
  //   // }
  //   res.json({
  //     message: "Product deleted successfully",
  //     success: true,
  //     error: false,
  //     data:result
  //   });

  // } catch (err) {
  //   res.status(400).json({
  //     message: err.message || err,
  //     error: true,
  //     success: false
  //   });
  // }
const deleteOneProductController = async(req, res) => {
  try{
    const  productId  = req.body.productId
  
    const product = await productModel.deleteOne({_id:productId})
    
    console.log(product)
    res.json({
        data : product,
        message : "Deleted Product Successfully ",
        success : true,
        error : false
    })
  
    
  }catch(err){
    res.json({
        message : err?.message  || err,
        error : true,
        success : false
    })
  }
};

module.exports = deleteOneProductController;



