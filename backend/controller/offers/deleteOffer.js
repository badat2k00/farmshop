
const offerModel = require('../../models/offerModel');
async function deleteOffer(req, res) {
    try { 
        const {offerId} = req.body;
        const offer= await offerModel.findById({_id:offerId})
        const allOffers=await offerModel.find({})
      
             await offerModel.deleteOne({_id:offerId})
            res.json({
                message: " Offer deleted Successfully",
                data:allOffers,
                error: false,
                success: true
            });
        
    } catch (e) {
        res.json({
            message: e?.message || e,
            error: true,
            success: false,
        });
    }
}

module.exports = deleteOffer;