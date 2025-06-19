import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayVNDCurrency from "../helpers/displayCurrency";
import { FaRegTrashCan } from "react-icons/fa6";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import convertTime from "../helpers/convertTime"
import AdminEditOffer from "./AdminEditOffer";
const AdminOfferCard = ({ data, fetchdata }) => {
  const [editOffer, setEditProduct] = useState(false);
  const [active,setActive]=useState("");
  const [expireDate,setExpireDate]=useState("")
  const {t}=useTranslation()
  
  const deleteOffer = async (offerId) => {
    try {
      console.log("Deleting Product ID:", offerId);
      const response = await fetch(SummaryApi.deleteOffer.url, {
        method: SummaryApi.deleteOffer.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          offerId
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(t(responseData.message), {
          position: "top-right",
          autoClose: 5000,
        });
        // Gọi lại fetchdata để cập nhật danh sách sản phẩm sau khi xóa
        fetchdata();
      } else {
        toast.error(t(responseData.message), {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
  const publishOffer=async(offerId)=>{
    try {
      console.log("Deleting Product ID:", offerId);
      const response = await fetch(SummaryApi.publishOffer.url, {
        method: SummaryApi.publishOffer.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          offerId
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(t(responseData.message), {
          position: "top-right",
          autoClose: 5000,
        });
        // Gọi lại fetchdata để cập nhật danh sách sản phẩm sau khi xóa
        fetchdata();
      } else {
        toast.error(t(responseData.message), {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
  const handleDelete = () => {
    deleteOffer(data._id);
    fetchdata()
  }
  const handleReFix=()=>{

  } 
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          {/* <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
            alt=""
          /> */}
        </div>
        <h1 className="text-ellipsis line-clamp-2 break-words">{data.code}</h1>
        <h1>Hạn:  {convertTime(data.expireDate)||""}</h1>
        <div>
          <p className="font-semibold">
            {/* {displayVNDCurrency(data.sellingPrice)} */}
            {data.detail}
          </p>

          
          <div className="flex justify-end">
       
           
          <div
              className="ml-au p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div><div
              className=" ml-au p-2 bg-green-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              <FaRegTrashCan/>
            </div>
           

          </div>
        </div>
      </div>

      {editOffer && (
        <AdminEditOffer
          productData={data}
          onClose={() => setEditProduct(false)}
          // fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminOfferCard;
