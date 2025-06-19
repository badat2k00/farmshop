const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try{
        const sessionUserId = req.userId
        const { categoryId, productName, brandName, color, productImage, description,stockquantity, price, sellingPrice } = req.body;
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
    
        const uploadProduct = new productModel({ categoryId:categoryId || null,stockquantity, productName, brandName, color, productImage, description, price, sellingPrice })
        const product= await productModel.findOne({productName:productName})
        if(product){
            res.json({
                message:"Vật tư đã tồn tại .Vui lòng dùng tên khác",
                error:true,
                success:false
            })
        }
        else{
        const saveProduct = await uploadProduct.save()
        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })
    }
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadProductController