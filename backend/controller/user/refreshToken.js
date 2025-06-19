const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function refreshTokenController(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error("No refresh token provided");
        }

        const user = await userModel.findOne({ refreshToken });
        if (!user) {
            throw new Error("Invalid refresh token");
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, tokenData) => {
            if (err) {
                throw new Error("Invalid refresh token");
            }

            const accessToken = jwt.sign({
                _id: user._id,
                email: user.email,
            }, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const accessTokenOption = {
                httpOnly: true,
                secure: true,
                // maxAge: 5 * 1000 // 5 seconds
            };

            res.cookie("accessToken", accessToken, accessTokenOption);

            res.status(200).json({
                message: "Access token refreshed successfully",
                success: true,
                error: false
            });
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = refreshTokenController;
