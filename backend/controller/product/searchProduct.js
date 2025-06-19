const productModel = require("../../models/productModel")

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q || req.body.query
        const queryRegex = query.split(' ').join('.*');
        const regex = new RegExp(queryRegex,'i')

        const product = await productModel.find({
            "$or" : [
                {
                    productName :  { $regex: regex }
                },
                
            ]
        })


        res.json({
            data  : product ,
            message : "Search Product list",
            error : false,
            success : true
        })
    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = searchProduct