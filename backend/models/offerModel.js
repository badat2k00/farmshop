const mongoose = require('mongoose')
let moment =require("moment-timezone")


moment.tz.setDefault("Asia/Ho_Chi_Minh");
const offerSchema = mongoose.Schema({
    code:String,
    detail:String,
    discountType:{
        type:String,
        enum:["percentage","fixed"]
    },
    discountValue:Number,
    expireDate:Date,
    maxDiscountMoney:Number,
    isActive:{
        type:Boolean,
        default:false
    }
},{
    timestamps : true
})


const offerModel = mongoose.model("offer",offerSchema)

module.exports = offerModel