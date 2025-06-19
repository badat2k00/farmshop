const orderModel = require("../../models/orderModel")

async function countProductsBuy(req,res){
    try{
        const items= await orderModel.find({status:"confirmed"})
        

        const totalCount = items.reduce((accumulator, group) => {
            return accumulator + group.items.reduce((innerAccumulator, item) => {
              return innerAccumulator + item.quantity;
            }, 0);
          }, 0);
        res.json({
            data : totalCount,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = countProductsBuy