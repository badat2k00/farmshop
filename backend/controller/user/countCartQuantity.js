const cartModel = require("../../models/cartModel")

const countCartQuantity = async(req,res)=>{
    try{
        const userId = req.userId

        const count = await cartModel.countDocuments({
            userId : userId
        })
        res.json({
            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })
    }catch(error){
        res.json({
            message : error.message || error,
            error : false,
            success : false,
        })
    }
    
}

module.exports = countCartQuantity