
import React, { useContext, useState, useEffect } from "react";
import Context from "../context";
import SummaryApi from "../common";
import { Link, useNavigate,useParams } from "react-router-dom";
import displayVNDCurrency from "../helpers/displayCurrency";
import Modal from "../components/Modal";
import getAllProvince from "../helpers/getAllProvince";
import getDistrictByProvince from "../helpers/getDistrictByProvince";
import getWardByDistrict from "../helpers/getWardByDistrict";
import discountByOffer from "../helpers/discountByOffer";
import splitAddress from "../helpers/splitAddress";
import {toast} from "react-toastify"
const Payment = () => {

  const [isOrder,setIsOrder]=useState(false)
  // const [offer,setOffer]=useState({})
  const [offer, setOffer] = useState({
    code: "",
    discountValue: "",
    discountType: "",
    maxDiscountMoney: "",
    expireDate: "",
    detail:""
  });
  const [offers,setOffers]=useState([])
  const [province,setProvince]=useState({
    province_id:"",
    province_name:"",
  })
  const [ward,setWard]=useState({
    ward_id:"",
    ward_name:"",
  })
  const [district,setDistrict]=useState({
    district_id:"",
    district_name:"",
  })
  const [provinces,setProvinces]=useState([])
  const [districts,setDistricts]=useState([])
  const [wards,setWards]=useState([])
  
  // const [isUpdated,setIsUpdated]=useState(false);
  // const { resetCartProduct} = useContext(Context);
  // const [openModal, setOpenModal] = useState(false);
  //  const context=useContext(Context)
  //  const [order,setOrder]=useState([])
  const [cart, setCart] = useState([]);
  const params = useParams();
  const [data, setData] = useState({
    customerName: "",
    shippingAddress: "",
    phoneNumber: "",
    paymentMethod: "",
    orderId:"",
    detail:""
  });
  const [homeAddress,setHomeAddress]=useState("")
  const [isDisable, setIsDisable] = useState(false);
  const bankCode = "NCB";
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
    // setOpenModal(false);
    // setIsDisable(false);
  };

  
  const deleteAllProductCartByUser = async () => {
    await fetch(SummaryApi.deleteAllProductInCart.url, {
      method: SummaryApi.deleteAllProductInCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.success ? console.log(data.message) : console.log(data.message);
      });
  };

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
      window.location.href = responseData.env;
    }
    if (responseData.error) {
      console.log("false");
    }
  }

  // function AllowCOD() {
  //   navigate("/user/all-orders");
  //   resetCartProduct();
  //   deleteAllProductCartByUser();
  // }

  // sửa thành update Order còn trang Cart => createOrder (id thôi )
  const updateOrderDetail = async () => {
    // handleChange(e)
    try {
      
      const fetchResponse = await fetch(SummaryApi.updateOrderDetail.url, {
        method: SummaryApi.updateOrderDetail.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({...data,shippingAddress:homeAddress.concat(",",ward?.ward_name+','+district?.district_name+','+province?.province_name),orderId:params?.id}),
      }); 
      const responseData = await fetchResponse.json();
      console.log(responseData?.data);
      if (responseData.error) {
        console.log(responseData.message)
        toast.error(responseData.message)
      }
      if(responseData.success){
         setData((prevData)=>({...prevData,shippingAddress:homeAddress.concat(",",ward?.ward_name+','+district?.district_name+','+province?.province_name)}))
        console.log(data)
        toast.success(responseData.message)
         //  console.log(data)
         //  await fetchLastestOrder()
        //  await context.fetchOrdersByUser()
        //  setOrder(context.orders);
          console.log(responseData.message)
        if (responseData.data.paymentMethod === "VNPAY") {

        } else {
          // AllowCOD();
          // setIsDisable(true)
        }
      }
     
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };


  const createOrder = async () => {
    try {
      const fetchResponse = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body:JSON.stringify({...data,shippingAddress:homeAddress.concat(",",ward?.ward_name+','+district?.district_name+','+province?.province_name),orderId:params?.id})
        
      });
      const responseData = await fetchResponse.json();
      console.log(responseData.message)
      if(responseData.success){
        // setIsOrder(true)
        console.log(responseData.message)
        if(data.paymentMethod==="VNPAY"){
          
            createPaymentUrl()
        }else{
            navigate("/")
            toast.success(responseData.message)
        }

        console.log("đã tạo rồi")
        // await fetchLastestOrder().then(data=>window.location.href=`/payment/${data._id}`)
      }else{
        setIsOrder(false)
        
      }

      
    } catch (err) {
      
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // setTimeout(()=>{updateOrderDetail()},5000)
   
    if(data.shippingAddress!==',,'&& data.shippingAddress!==''){
      
      if(isOrder===false){
        createOrder()
        }
      else{
      await updateOrderDetail()}
    }
    else{
      console.log("Điền lại ")
    }


    // setIsDisable(!isDisable);
    // if (isDisable === true) {
    //   setOpenModal(false);
    // } else {
    //   setOpenModal(true);
    // } c 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'homeAddress') {
      setHomeAddress(value);  // Cập nhật homeAddress
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,  // Cập nhật các thuộc tính khác trong data
      }));
    }
  
    
  };
  const handleChangeHomeAddress=(e)=>{
    setHomeAddress(e.target.value)
   }
  const handleChangeOffer=(e)=>{
    const selectedOfferCode = e.target.value;
    const selectedOffer = offers.find((offer) => offer.code === selectedOfferCode); 
    // totalPrice=totalPrice-offer
    // setOffer((prevOffer) => ({
    //   ...prevOffer, // Giữ lại các thuộc tính cũ của offer
    //   ...selectedOffer, // Cập nhật các thuộc tính từ selectedOffer
    // }));
    // console.log(offer)
    if(!selectedOffer){
      setOffer((prev)=>({...prev,discountValue:0}))
    }
    setOffer((prev)=>({...prev,...selectedOffer}))
    // console.log(offer)
   
  }
  const handleChangeProvince=async(e)=>{
    const newProvinceId=e.target.value
    console.log(newProvinceId)
    const selectedProvince = provinces.find(
      (province) => province.province_id === newProvinceId
  );
  if(selectedProvince?.province_name!==null){
     setProvince({province_name:selectedProvince?.province_name,province_id:newProvinceId})
     let data=await getDistrictByProvince(newProvinceId);
      setDistricts(data)
    }
    else{
      alert("Bạn chưa điền Tỉnh ")
    }
      

      
      
      
      // setData((prevData) => ({
      //   ...prevData,
      //   shippingAddress: selectedProvince.province_name  // Cập nhật trực tiếp
      // }));
  }

  const handleChangeDistrict=async(e)=>{
    const newDistrictId=e.target.value
    const selectedDistrict = districts.find(
      (district) => district.district_id === newDistrictId
  );
  
    setDistrict({district_name:selectedDistrict?.district_name,district_id:selectedDistrict?.district_id})
      const data =  await getWardByDistrict(newDistrictId);
      setWards(data)
  }
  const handleChangeWard=async(e)=>{
    const newWardId=e.target.value
    const selectedWard = wards.find(
      (ward) => ward.ward_id === newWardId
  );
   
    setWard({ward_name:selectedWard?.ward_name,ward_id:newWardId})
    setData((data)=>({...data,shippingAddress:selectedWard.ward_name+","+ district.district_name+','+ province.province_name}))
    
  }

  const fetchAddToCartProduct = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if(responseData.success){
      setIsOrder(false)
      setCart(responseData?.data)
      console.log(cart)
    }
     return responseData?.data
    
  };
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

    const dataReponse = await response.json();
    // setIsUpdated(true)
    // setData(dataReponse.data)
    // setIsDisable(true)
    
  };



  const fetchLastestOrder = async () => {
    const dataResponse = await fetch(SummaryApi.getLastestOrder.url, {
      method: SummaryApi.getLastestOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await dataResponse.json();
  
    if(dataApi.data?.offerId===undefined){

    }
    if (dataApi.success &&Object.keys(dataApi.data).length>0) {
      console.log(dataApi.success)
      setIsOrder(true)
      setData(dataApi.data)
      // setProvince((province)=>({...province,province_name:dataApi.data.shippingAddress[]}))
      setCart(dataApi.data?.items)
      setHomeAddress(splitAddress(data.shippingAddress)[0])

      // let selectedProvince=provinces.find(province=>province.province_name===dataApi?.data?.shippingAddress.split(',')[0])?.province_id
      // console.log(selectedProvince)
      // setProvince({name_with_type:dataApi.data.shippingAddress.split(',')[2],code:selectedProvince})
  
      // let selectedDistrict=districts.find(district=>district.district_name===dataApi?.data?.shippingAddress.split(',')[1])?.code
      // console.log(selectedDistrict)
      // setDistrict({name_with_type:dataApi.data.shippingAddress.split(',')[1],code:selectedDistrict})
      
      // let selectedWard=wards.find(ward=>ward.ward_name===dataApi?.data?.shippingAddress.split(',')[0])?.code
      // console.log(selectedWard)
      // setWard({name_with_type:dataApi.data.shippingAddress.split(',')[1],code:selectedWard})
      
    }

    if (Object.keys(dataApi.data).length===0) {
      console.log("Failed");
      setIsOrder(false)
      fetchAddToCartProduct()
 
      
      //  await fetchAddToCartProduct().then(data=>setCart(data.data))
    }
    return dataApi.data   
  }
 
  useEffect(() => {
   getAllProvince().then(provinces=>setProvinces(provinces))
    // })
    const fetchAllOffers = async () => {
      const response = await fetch(SummaryApi.getOfferByUser.url, {
        method: SummaryApi.getOfferByUser.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const dataResponse = await response.json();
  
      console.log("product data", dataResponse);
      console.log(dataResponse.data);
      setOffers(dataResponse?.data || []);
    };
    fetchAllOffers()
   async function fetchData() {
    await fetchLastestOrder()
 
   }
   fetchData()
   
  // Gọi hàm fetchCartData
  // fetchAddToCartProduct()
  fetchOrderDetailById()

  
  // //   }
  }, [isOrder]);


  
  // const totalQty = cart.reduce(
  //   (previousValue, currentValue) => previousValue + currentValue.quantity,
  //   0
  // );


  // totalPrice ko thay đổi ,offer thay đổi 
  
 
  let totalPrice;
  
  if (isOrder===true) {
    totalPrice = cart.reduce(
      (preve, curr) => preve + curr.quantity * curr?.sellingPrice,0 );
  } else {
    totalPrice = cart.reduce((preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,0);
  }
  if (offer.discountValue) {
    const newDiscount = discountByOffer(
      totalPrice,
      offer.discountType,
      offer.discountValue,
      offer.maxDiscountMoney
    );
    
    totalPrice=totalPrice-newDiscount
    // Áp dụng giảm giá vào tổng giá
    // if (totalPrice - newDiscount >= 0) {
    //   totalPrice = totalPrice - newDiscount;
    // }
  }
  if(!offer?.code){
    totalPrice=totalPrice-0;
  }
  
  // console.log(isOrder)
  
  return (
    <>
      {/* {isOrder===false?(
      <>
        {cart.map(product=>{
          return<>{JSON.stringify(product)}</>
        })}
      </>
      ) : ( */}
        <div className="flex flex-col md:flex-row mx-auto p-4 h-full lg:max-w-screen-xl gap-2 ">
          {/* shipping infomation */}

          {/* {openModal && (
            <Modal
              onClose={closeModal}
              content={"Bạn có đồng ý thực hiện giao dịch ko "}
              funcAllow={
                // data.paymentMethod === "VNPAY" ? createPaymentUrl : AllowCOD
                updateOrderDetail
              }
              funcDeny={""}
            />
          )} */}
            {/* {JSON.stringify(province)} */}
          <div className="flex flex-col w-[50%] md:w-full h-auto p-8 gap-3">
            <h1 className="text-center">Thông tin giao hàng </h1>
            <form onSubmit={handleSubmit}>
              {/* <div className={`flex  ${isDisable===true?"flex-row ":"flex-col bg-red-200" } h-5`}> */}
              <div >
              {/* <label className={`w-full ${isDisable&&"w-[100px]"} `}>Họ và Tên {isDisable&&":"} </label> */}
              <label className={`w-full  `}>Họ và Tên  </label>
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
                name="homeAddress"
                value={homeAddress}
                onChange={handleChange}
                // required
                className="w-full px-2"
                // disabled={isDisable}
                  
              /> 
          
              <br />
              {/* {code} */}
              <div className="flex justify-around ">
                <label htmlFor="">Tỉnh/thành</label>
                <label htmlFor="">Quận/huyện</label>
                <label htmlFor="">Xã/phường</label>
              </div>
              <div className="flex justify-between gap-2 ">
                <select name="province_name" onChange={handleChangeProvince}className="w-[33.33%] overflow-x-scroll">   
                 {isOrder?<option value="" key="">{splitAddress(data.shippingAddress)[3]}</option>:<option value="null" key="null">Chọn Tỉnh/thành</option>}
                  
                  {/* {JSON.stringify(provinces)} */}
                {provinces.map(province=>(<option key={province.province_id} value={province.province_id}>{province.province_name}</option>))}
                </select>

                <select name="name_with_type" onChange={handleChangeDistrict} className="w-[33.33%]" >
                {isOrder?<option value="" key="">{splitAddress(data.shippingAddress)[2]}</option>:<option value="null" key="null">Chọn Quận/Huyện</option>}
                  {districts.map(district=>(<option key={district.district_id} value={district.district_id}>{district.district_name}</option>))}
                </select>
              
                <select name="name_with_type"  onChange={handleChangeWard}className="w-[33.33%]">
                {isOrder?<option value="" key="">{splitAddress(data.shippingAddress)[1]}</option>:<option value="null" key="null">Chọn Xã/Phường</option>}
                {wards.map(ward=>(<option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>))}
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
              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="controls mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={data.paymentMethod === "COD"}
                    onChange={handleChange}
                    // disabled={isDisable}
                    required
                  />

                  <span className="ml-2">Thanh toán khi nhận hàng </span>
                </label>
              </div>
              {/* {data.shippingAddress} */}
              <div className="controls mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="VNPAY"
                    checked={data.paymentMethod === "VNPAY"}
                    required
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
              {/* {data.shippingAddress} */}
              <textarea
                type="text"
                name="detail"
                value={data.detail}
                onChange={handleChange}
                className="w-full px-2"
                rows={5}
              />
              <button onClick={()=>navigate("/cart")}>Quay lại giỏ hàng</button>
              <button
                type="submit"
                className={`${
                  isDisable ? "bg-slate-500" : "bg-blue-500"
                } p-2 rounded-md`}
              
              
              >
                {/* {isDisable
                  ? "Sửa thông tin đơn hàng"
                  : "Lưu thông tin giao hàng"} */}
                
                {data.paymentMethod==="VNPAY"?"Thanh toán":"Đặt hàng"}
              </button>
            </form>
          </div>

            
          <form  className="  w-[50%] md:w-full p-4 h-auto " >
            
            <div className="flex flex-col md:justify-center   lg:justify-between ">
              {/***view product */}
              <div className="w-full  md:max-w-screen-md ">
                
                {isOrder &&cart.map((product, index) => 
                  
                    <div
                      key={product?._id}
                      className="w-full bg-white lg:h-14  my-2 border rounded flex flex-row  "
                    >
                      <div className="w-16 h-14 bg-slate-200">
                        <img
                          src={
                            
                      product?.productImage[0]
                          }
                          className="w-full h-full object-scale-down mix-blend-multiply bg-slate-50 "
                          alt="product-img"
                        />
                      </div>
                      <div className="px-4 py-2  w-full flex justify-between  flex-col md:flex-row">
                        {/**delete product */}

                        <div className="text-sm w-[100%] lg:w-[50%]  break-all">
                        { product?.productName
                          
                          }
                        </div>
                        <div className="hidden lg:block w-[10%] text-center bg-white">
                          <span>x</span>
                        </div>
                        <div className="w-[10%] text-center bg-white">
                          <span>{product?.quantity}</span>
                        </div>
                        <p className="text-slate-600 font-semibold w-[50%] lg:w-[20%] text-sm lg:text-base text-right break-all">
                        { displayVNDCurrency(product?.sellingPrice)
                           }
                        </p>


                        
                      </div>
                    </div>)}
                    {isOrder===false&&cart.map((product, index) => 
                  
                    <div
                      key={product?._id}
                      className="w-full bg-white lg:h-14  my-2 border rounded flex flex-row  "
                    >
                      <div className="w-16 h-14 bg-slate-200">
                        <img
                          src={
                          product?.productId?.productImage[0]
                          }
                          className="w-full h-full object-scale-down mix-blend-multiply bg-slate-50 "
                          alt="product-img"
                        />
                      </div>
                      <div className="px-4 py-2  w-full flex justify-between  flex-col md:flex-row">
                        {/**delete product */}

                        <div className="text-sm w-[100%] lg:w-[50%]  break-all">
                        {product?.productId?.productName
                          }
                        </div>
                        <div className="hidden lg:block w-[10%] text-center bg-white">
                          <span>x</span>
                        </div>
                        <div className="w-[10%] text-center bg-white">
                          <span>{product?.quantity}</span>
                        </div>
                        <p className="text-slate-600 font-semibold w-[50%] lg:w-[20%] text-sm lg:text-base text-right break-all">
                        { displayVNDCurrency(
                                product?.productId?.sellingPrice
                              )}
                        </p>


                        
                      </div>
                    </div>)}

                    
                
                
              </div>
              {district.district_id}
         {/* {offer} */}
              <hr className="bg-black h-0.5 w-full" />
              {/***summary  */}
              
              {cart.length !== 0 && (
                <div className="  mt-5 lg:mt-0 w-full ">
                  <div className="">
                    {/* <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2> */}

                    <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                      <p>Tạm tính</p>
                      <p>{displayVNDCurrency(totalPrice)}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <hr className="bg-black h-0.5 w-full" />
{offer.discountValue}
              <div className="  mt-5 lg:mt-0 w-full ">
                <div className="">
                  <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                    <label htmlFor="promote">Ưu đãi</label>
                    <select name="offer" onChange={handleChangeOffer}>
                    <option value={1}>Chọn ưu đãi</option>
                     {offers.map(offer=><option value={offer.code} key={offer.code} className={`${offer.expireDate && "bg-red-500"}`}>{offer.code}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="  mt-5 lg:mt-0 w-full ">
                <div className="">
                  <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                    <label htmlFor="promote">Tổng tiền</label>
                    <p>{displayVNDCurrency(totalPrice)}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <input type="checkbox" name="" id="" />
            Tôi đã kiểm tra thông tin đơn hàng . */}
            <br />
          
          </form>
        </div>
       
    </>
  );
};

export default Payment;

/* 
trường hợp => ko điền thông tin => ko hiển thị nút thanh toán Hoặc đặt hàng 
nếu mà điền thông tin => save vào => kiểm tra đơn hàng được tạo là phương thức gì => Nút đó là thanh toán hay đặt hàng 
tiếp theo viết hàm cho nút Thanh Toán hoặc đặt hàng (đó) => gồm createPaymentUrl cho VNPAY và allowCOD cho COD . Đều phải verify OTP (nếu ok => thực hiện 2 hàm tiếp theo ,nếu ko => hủy đơn hàng đó  )
*/



/* 
cho createPayment => nhung kiem tra fetch Latest neu isPaid =true => thi luu ko thi thoi 



*/