const reviewModel= require("../../../models/reviewModel")
const userModel=require("../../../models/userModel")
async function getReviewByProduct(req,res) {
    try {
        let productId=req.params.productId;
         const reviews=await reviewModel.find({productId: productId})
    res.status(201).json({
        data:reviews,
        message:"Fetch Review Successfully",
        success:true,
        error:false})
    } catch (error) {
        console.log(error)
    }
}
module.exports=getReviewByProduct