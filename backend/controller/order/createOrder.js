
const orderModel = require('../../models/orderModel');
const orderItemSchema = require('../../models/orderItemsModel');
const productModel = require('../../models/productModel');
const addToCartModel = require('../../models/cartModel');

async function createOrder(req, res,next) {
    try {
        const currentUser = req.userId;

        // Kiểm tra xem userId có tồn tại không
        if (!currentUser) {
            return res.json({
                message: "User ID is required.",
                error: true,
                success: false,
            });
        }

        ``
        // Lấy các mục từ giỏ hàng của người dùng
        const cartItems = await addToCartModel.find({ userId: currentUser });

        // Kiểm tra giỏ hàng trống
        if (!cartItems || cartItems.length === 0) {
            return res.json({
                message: "Cart is empty.",
                error: true,
                success: false,
            });
        }
        // const PendingOrder= orderModel.findOne({ userId: currentUser,status:"pending"})
        // console.log(PendingOrder)
        // if(PendingOrder){
        //     res.json({
        //         message:"You can't create Order at time",
        //         error: true,
        //         success: false,
        //     })
        // }

        // Khởi tạo đối tượng để theo dõi productId
        const productIdTracker = {};

        // Khởi tạo tổng số tiền
        let totalAmount = 0;

        // Xử lý các mục trong giỏ hàng để tính toán tổng số tiền và định dạng chúng cho đơn hàng
        const processedItems = await Promise.all(cartItems.map(async cartItem => {
            const { productId, quantity } = cartItem;

            // Kiểm tra trùng lặp productId
            if (productIdTracker[productId]) {
                throw new Error(`Duplicate productId found: ${productId}`);
            }
            productIdTracker[productId] = true;

            // Kiểm tra productId có tồn tại trong productModel không
            const product = await productModel.findById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} does not exist.`);
            }

            const { sellingPrice,productName,productImage} = product;

            // Tính toán tổng số tiền
            totalAmount += sellingPrice * quantity;

            return {
                productId,
                productName,
                productImage,
                quantity,
                sellingPrice,
            };
        }));

        // Tạo payload cho đơn hàng mới
        const { customerName,shippingAddress, phoneNumber,paymentMethod,detail} = req.body;
        
        let isPaid='false';

        const payload = {
            customerName: customerName,
            orderDate: new Date(),
            shippingAddress: shippingAddress,
            phoneNumber: phoneNumber,
            status:'pending',
            isPaid:isPaid,
            paymentMethod:paymentMethod,
            userId: currentUser,
            items: processedItems,
            totalAmount: totalAmount,
            detail:detail
        };

        // Ghi log payload để debug
        // console.log("Payload:", payload);

        // Lưu đơn hàng mới
        const newOrder = new orderModel(payload);
        const saveOrder = await newOrder.save();

        
        // Xóa các mục đã được đặt hàng khỏi giỏ hàng
        // if(saveOrder.isPaid==="true"){
         
        // }
        // await addToCartModel.save()
        // Phản hồi với thông điệp thành công
        
        res.json({
            message: "Create Order Successfully",
            data: saveOrder,
            id: saveOrder.id,
            data2:addToCartModel,
            error: false,
            success: true
        });
    
    } catch (e) {
        // Phản hồi với thông điệp lỗi
        res.json({
            message: e?.message || e,
            error: true,
            success: false,
        });
    }
}

module.exports = createOrder;

/* 




*/