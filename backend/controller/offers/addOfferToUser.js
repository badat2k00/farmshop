
const offerModel = require("../../models/offerModel");
const userModel = require("../../models/userModel");

async function addOfferToUser(req, res) {
    try {
        const currentUser = req.userId;
        const {offerId} = req.body;

        const user = await userModel.findOne({ _id: currentUser });
        if (!user) {
            return res.json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // const existingOffer = user.offers.find(el => el._id.toString()=== offerId);
        const existingOffer = user.offers.find(el => el._id.toString()=== offerId);
        // const existingOffer = user.offers.some(
        //     (offer) => offer.offerId === offerId
        // );
        if (!existingOffer) {
            user.offers.push({_id:offerId});
            await user.save()
            return res.json({
                message: "Offer added to user successfully",
                data: user,
                error: false,
                success: true
            });
        }
        return res.json({
            message: "User has already received this offer",
            
            error: true,
            success: false
        });
        

    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}

module.exports = addOfferToUser;