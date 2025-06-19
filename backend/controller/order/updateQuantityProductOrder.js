const orderModel=require("../../models/orderModel")

const updateQuantityProduct = async(req,res)=>{
    try{
        const currentUser = req.userId 
     
        const order = await orderModel.findOne({
            status: "pending",
            userId: currentUser,
          });
        const {quantity,productId} = req.body

        if(quantity<=0){
            return res.json({
            message : "Unable to save",
            error : false,
            success : true
            })
        }
        let updateProduct=order.items.find(item=>item.productId===productId)
        
        order.totalAmount=order.totalAmount+(quantity-updateProduct.quantity)*updateProduct.sellingPrice
        updateProduct.quantity=quantity       
        await order.save()

        res.json({
            message : "Product Updated quantity",
            data :order,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateQuantityProduct