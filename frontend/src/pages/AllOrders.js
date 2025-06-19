import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import SummaryApi from "../common";
import DetailsOrders from "../components/DetailsOrders";
import PaginatedItems from "../components/PaginatedItems";
import convertTime from "../helpers/convertTime";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [AllOrders,setAllOrders]=useState([]);
  const [currentItems, setCurrentItems] = useState(0);
  const user = useSelector((state) => state?.user?.user);
  const [bankCode, setBankCode] = useState("");
  const [loading,setLoading]=useState(false)
  // if roles=Admin  fetch , role =General =>
  const [openDetailOrder, setOpenDetailOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchAllOrders = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.getAllOrders.url, {
      method: SummaryApi.getAllOrders.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await dataResponse.json();

   setOrders(dataApi.data);
    if (dataApi.success) {
      console.log("Success");
    }

    if (dataApi.error) {
      console.log("Failed");
    }
  }, []);

  async function createPaymentUrl() {
    const a = await fetch(SummaryApi.createPaymentUrl.url, {
      method: SummaryApi.createPaymentUrl.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ bankCode }),
    });
    const responseData = await a.json();
    console.log(responseData);
    if (responseData.success) {
      console.log(responseData.data);
      window.location.href = responseData.env;
    }
    if (responseData.error) {
      console.log("false");
    }
  }
  const handlePayment = () => {
    createPaymentUrl();
  };
  const fetchOrdersByUser = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.getOrdersbyUser.url, {
      method: SummaryApi.getOrdersbyUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await dataResponse.json();
    console.log(dataApi.data)
    if (dataApi.success &&dataApi.data) {
      setBankCode("NCB");
      console.log("Success");
      setOrders(dataApi.data);
    }

    if (dataApi.error) {
      console.log("Failed");
    }
  }, []);

  const handleDetailOrder = (order) => {
    setSelectedOrder(order);
    setOpenDetailOrder(true);
  };
  const closeDetailOrder = () => {
    setOpenDetailOrder(false);
  };
  useEffect(() => {
    if (user?.role === ROLE.ADMIN) {
      fetchAllOrders();
    } else {
      fetchOrdersByUser();
    }
  }, [user,fetchAllOrders,fetchOrdersByUser]);

  const handleDeleteOrder = async (order) => {
    
    const newOrder=orders.filter(a=>a._id!==order._id)
    // setOrders(newOrder)
    try{
   const res= await fetch(SummaryApi.deleteOrder.url, {
      method: SummaryApi.deleteOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body:JSON.stringify({orderId:order._id})
    })
    const data=await res.json()
    console.log(data)
    if(data.success){
      setOrders(newOrder)
      // await fetchOrdersByUser()
    }
  }catch(e){
    console.error(e)
  }
  };
  // useEffect(() => {
  //   // Nếu bankCode thay đổi, bạn có thể gọi hàm thanh toán ở đây hoặc xử lý logic khác.
  //   if (bankCode) {
  //     console.log("Bank code updated:", bankCode);
  //   }
  // }, [bankCode]);
  return (
    <>
      {openDetailOrder && (
        <DetailsOrders onClose={closeDetailOrder} order={selectedOrder} />
      )}
      {user?.role === ROLE.ADMIN && (
        <div className="bg-white pb-4 ">
          <table className="w-full userTable h-[calc(100vh-100px)]">
            <thead>
              <tr className="bg-black text-white">
                <th>Mã đơn hàng</th>
                <th>Mã khách hàng</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Chi tiết đơn hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái đơn hàng</th>
                <th>Thanh toán</th>
                <th>Phương thức thanh toán</th>
                <th>Tổng tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody className="">
              {currentItems &&
                currentItems.map((order, index) => (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.userId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.shippingAddress}</td>
                    <td>
                      <button
                        className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
                        onClick={() => handleDetailOrder(order)}
                      >
                        Xem
                      </button>
                    </td>
                    <td>{convertTime(order.orderDate)}</td>
                    <td>{order.status}</td>
                    <td>{order.isPaid ? "Yes" : "No"}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.totalAmount}</td>
                    <td className="p-4">{
                      order.status === "pending" &&
                      "Hủy đơn " && <button
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all  px-3 "
                      onClick={() => handleDeleteOrder(order)}
                    >
                      Hủy đơn 
                    </button>}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {user?.role === ROLE.GENERAL  && (
        <div className="pb-4  h-[calc(100vh-100px)]">
          <table className="w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>Mã đơn hàng</th>
                <th>Chi tiết đơn hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái đơn hàng</th>
                <th>Thanh toán</th>
                <th>Phương thức thanh toán</th>
                <th>Tổng tiền</th>
                <th>Hành động</th>
                <th>Hello</th>
              </tr>
            </thead>
            <tbody className="">
              {currentItems&&currentItems.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <th>
                    <button
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
                      onClick={() => handleDetailOrder(order)}
                    >
                      Xem chi tiết
                    </button>
                  </th>
                  <td>{convertTime(order.orderDate)}</td>
                  <td>{order.status}</td>
                  <td>{order.isPaid ? "Yes" : "No"}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.totalAmount}</td>
                  {/* Thêm nút  Hủy vào + CHỉ cho Thanh Toán với VNPAY thôi  */}
                  <td>
                    {order.paymentMethod === "VNPAY" &&
                      order.status === "pending" && (
                      <>  <button onClick={handlePayment}>
                          Thanh toán 
                        </button>
                        {/* <Link to={`/payment/${order?._id}`}>Đặt hàng</Link> */}
                        </>
                      )}
                      {order.status==="completed" &&" Phản hồi "}
                    {order.status === "canceled" && "Xóa Đơn"}{" "}
                    {
                      order.status === "pending" &&
                      "Hủy đơn " && <button
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
                      onClick={() => handleDeleteOrder(order)}
                    >
                      Hủy đơn 
                    </button>}
                    {order.status==="confirmed"&&"Đổi /Trả hàng "}
                  </td>

                 
                 
                  {/* <td><UpdateOrder order={order} isUpdate={isUpdate} fetchOrdersByUser={fetchOrdersByUser()}/>Sửa</td> */}
                  <td>
                    <Link to={`/update/${order?._id}`}>Sửa</Link>
                  </td>
                  <td>
                 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user?.role!=="ADMIN"?<PaginatedItems
        itemsPerPage={5}
        setCurrentItems={setCurrentItems}
        items={orders}
      />:<PaginatedItems
      itemsPerPage={5}
      setCurrentItems={setCurrentItems}
      items={orders}/>}
    </>
  );
};

export default AllOrders;

// Nếu chưa thanh toánn đơn hàng cũ => ko được xóa trong add to cart

// Return url sẽ ko xóa (điều kiện fetch lastest order  kiểm tra isPaid = true chưa nếu )
/* 
Đơn đã thanh toán chỉ được sửa địa chỉ giao hàng 
Đơn chưa thanh toán /thanh toán bằng COD được thay đổi địa chỉ ,ptt toán 
*/