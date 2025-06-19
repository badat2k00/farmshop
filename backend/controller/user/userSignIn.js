// const bcrypt = require('bcryptjs')
// const userModel = require('../../models/userModel')
// const jwt = require('jsonwebtoken');

// async function userSignInController(req,res){
//     try{
//         const { email , password} = req.body

//         if(!email){
//             throw new Error("Please provide email")
//         }
//         if(!password){
//              throw new Error("Please provide password")
//         }

//         const user = await userModel.findOne({email})

//        if(!user){
//             throw new Error("User not found")
//        }

//        const checkPassword = await bcrypt.compare(password,user.password)

//        console.log("checkPassword",checkPassword)

//        if(checkPassword){
//         const tokenData = {
//             _id : user._id,
//             email : user.email,
//         }
//         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60*60*8 });
        
//         const tokenOption = {
//             httpOnly : true,
//             secure : true
//         }

//         res.cookie("token",token,tokenOption).status(200).json({
//             message : "Login successfully",
//             data : token,
//             success : true,
//             error : false
//         })

//        }else{
//          throw new Error("Please check Password")
//        }


//     }catch(err){
//         res.json({
//             message : err.message || err  ,
//             error : true,
//             success : false,
//         })
//     }

// }

// module.exports = userSignInController

// Code mới sửa (thử )
const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
// tạo model session và lưu vào khi đăng nhập 
async function userSignInController(req, res) {
    // Tạo 1 biến thời gian để lưu vào database session
    // Tạo biến lưu thiết bị , IP =>lưu vào database session ư

    // Tạo biến status:trạng thái đăng nhập nếu thành công thì 
    try {   
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email});

        if (!user) {
            throw new Error("User not found");
        }
        if(email==user.email && user.isGoogle==true){
            throw new Error("Email đã được đăng ký bằng Google");
        }
        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };

            const accessToken = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '7h' });
            if(!accessToken){
                
            }
            const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });

            // Save the refresh token in the database or another persistent storage
            user.refreshToken = refreshToken;
            await user.save();

            const accessTokenOption = {
                httpOnly: true,
                secure: true,
                // maxAge: 5 * 1000 * 60 // 5 seconds
                // sameSite: "none",
                // maxAge: 72 * 60 * 60 * 1000,
            };

            

            res.cookie("accessToken", accessToken, accessTokenOption);

            res.status(200).json({
                refreshToken:refreshToken,
                accessToken:accessToken,
                message: "Login successfully",
                success: true,
                error: false
            });

        } else {
            throw new Error("Please check Password");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;




/* nếu thiết bị + IP + status thành công => lần sau đăng nhập 
Ko cần verify nữa 

Thiết lập status : detail true (email+ password true)
Thiết bị đúng ; IP sai ; status : detail đúng :
Gửi email xác nhận hoặc mã pin 

Thiết bị sai , IP đúng , status :detail đúng :
Vẫn cho đăng nhập 

Thiết bị sai ,IP sai ,detail đúng 
Gửi email xác nhận 

Thiết bị đúng ,IP đúng ,detail sai
+Cách xử lý 
Nhập mã pin:Sai mã pin quá 5 lần khóa 

hoặc chọn forgot password(gửi email xác nhận OTP , nhập sai quá 5 lần => khóa không cho nhận OTP 

) 

Thiết bị sai ,IP sai ,detail sai 



// thummarkJS =>get frontend=>fingerprint 



*/