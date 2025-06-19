const offerModel=require("../../models/offerModel")
async function editOffer(req,res){
try {
    const {offerId,...data}=req.body.offerId;
    const offer=await offerModel.findByIdAndUpdate({_id:offerId})
    
   
        await offer.findByIdAndUpdate(_id)
        res.json({
            message: " Offer update successfully",
            data:allOffers,
            error: false,
            success: true
        });
    
   
   
   
 
} catch (error) {
    console.log(error)
}
}
module.exports= editOffer