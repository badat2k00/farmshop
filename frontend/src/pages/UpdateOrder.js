import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../common";

const UpdateOrder = () => {
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();
  // const [isUpdated,setIsUpdated]=useState(false)
  const [data, setData] = useState({
    customerName: "",
    shippingAddress: "",
    phoneNumber: "",
    paymentMethod: "",
    orderId: params._id,
  });
  const fetchOrdersByUser = async () => {
    const dataResponse = await fetch(SummaryApi.getOrdersbyUser.url, {
      method: SummaryApi.getOrdersbyUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await dataResponse.json();
  };
  const updateOrders = () => {};
  const fetchOrderDetailById = async () => {
    const response = await fetch(SummaryApi.getOrderDetailById.url, {
      method: SummaryApi.getOrderDetailById.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: params?.id,
      }),
    });
    // setIsUpdated(true)

    const dataReponse = await response.json();
    console.log(dataReponse);
    setData(dataReponse.data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // setIsUpdated(true)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateOrderDetail();
  };
  const updateOrderDetail = async () => {
    // handleChange(e)
    try {
      const fetchResponse = await fetch(SummaryApi.updateOrderDetail.url, {
        method: SummaryApi.updateOrderDetail.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...data, orderId: params?.id }),
      });
      const responseData = await fetchResponse.json();
      console.log(responseData);
      if (responseData.error) {
        const errorData = await fetchResponse.json();

        return;
      }
      if (responseData.success) {
        setData(responseData.data);
        //  await context.fetchOrdersByUser()
        navigate("/user/all-orders");
        await fetchOrdersByUser();
        //  setOrder(context.orders);
        console.log(responseData.data2);

        console.log(responseData.message);
        if (responseData.data.paymentMethod === "VNPAY") {
          // setOpenModal(false);
          // setIsDisable(true)
        } else {
          // AllowCOD();
          // setIsDisable(true)
        }
      }
    } catch (err) {}
  };
  // useEffect(()=>{
  //  if(!isUpdated) {fetchOrderDetailById()}
  // },[params])
  return (
    <div>
      <div className="flex flex-col w-[50%] md:w-full h-auto bg-orange-300 p-8 gap-3">
        <h1 className="text-center">Thông tin giao hàng </h1>
        <form onSubmit={handleSubmit}>
          {/* <div className={`flex  ${isDisable===true?"flex-row ":"flex-col bg-red-200" } h-5`}> */}
          <div className={`flex  bg-red-200" } h-5`}>
            {/* <label className={`w-full ${isDisable&&"w-[100px]"} `}>Họ và Tên {isDisable&&":"} </label> */}
            <label className={`w-full  `}>Họ và Tên </label>
            <input
              type="text"
              name="customerName"
              value={data.customerName}
              onChange={handleChange}
              required
              // className={`w-full px-2  ${
              //   isDisable && "bg-transparent w-[80%]"
              // }`}
              className={`w-full px-2 
                 w-[80%]"
                }`}
              // disabled={isDisable}
            />
          </div>
          <br />
          <label>Số nhà,Tên đường:</label>
          <br />
          <input
            type="text"
            name="shippingAddress"
            value={data.shippingAddress}
            onChange={handleChange}
            required
            className="w-full px-2"
            // disabled={isDisable}
          />
          <br />
          <div className="flex justify-around ">
            <label htmlFor="">Tỉnh/thành</label>
            <label htmlFor="">Quận/huyện</label>
            <label htmlFor="">Xã/phường</label>
          </div>
          <div className="flex justify-between gap-2 ">
            <select name="" id="" className="w-[33.33%]">
              <option value="">Hello</option>
              <option value="">Hello </option>
            </select>
            <select name="" id="" className="w-[33.33%]">
              <option value="">Hello</option>
              <option value="">Hello </option>
            </select>
            <select name="" id="" className="w-[33.33%]">
              <option value="">Hello</option>
              <option value="">Hello </option>
            </select>
          </div>

          <label>Số điện thoại </label>
          <br />
          <input
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-2"
            // disabled={isDisable}
          />

          <h3>Phương thức thanh toán </h3>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

          <div className="controls mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={data.paymentMethod === "COD"}
                onChange={handleChange}
                // disabled={isDisable}
              />

              <span className="ml-2">Thanh toán khi nhận hàng </span>
            </label>
          </div>

          <div className="controls mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="VNPAY"
                checked={data.paymentMethod === "VNPAY"}
                onChange={handleChange}
                // disabled={isDisable}
                // className={`${isDisable?"hidden":"block"}`}
              />
              {/* <span className={`${isDisable?"hidden":"block"} ml-2`}>Thanh toán bằng VNPAY</span> */}
              <span className={`ml-2`}>Thanh toán bằng VNPAY</span>
            </label>
          </div>

          <label>Ghi chú</label>
          <br />
          <textarea
            type="text"
            name=""
            value={""}
            onChange={handleChange}
            className="w-full px-2"
            rows={5}
          />
          <button>Quay lại giỏ hàng</button>
          <button
            type="submit"
            // className={`${
            //   isDisable ? "bg-slate-500" : "bg-blue-500"
            // } p-2 rounded-md`}
          >
            {/* {isDisable
                  ? "Sửa thông tin đơn hàng"
                  : "Lưu thông tin giao hàng"} */}
            Lưu thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;
