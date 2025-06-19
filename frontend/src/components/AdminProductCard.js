import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayVNDCurrency from "../helpers/displayCurrency";
import { FaRegTrashCan } from "react-icons/fa6";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
 import {useDispatch, useSelector}from "react-redux";
import { deleteProduct, } from "../store/productSlice";
const AdminProductCard = ({ data }) => {
  const [editProduct, setEditProduct] = useState(false);
    const {t}=useTranslation()
  const dispatch= useDispatch();
  const products=useSelector(state=>state.products.products)
  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    
    console.log("product data",dataResponse)

    
  }




  const deleteProductById = async (productId) => {
    try {
      console.log("Deleting Product ID:", productId);
      const response = await fetch(SummaryApi.deleteOneProduct.url, {
        method: SummaryApi.deleteOneProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(t(responseData.message), {
          position: "top-right",
          autoClose: 5000,
        });
        // Gọi lại fetchdata để cập nhật danh sách sản phẩm sau khi xóa
        dispatch(deleteProduct(productId))
        // fetchdata();
        
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

  const handleDelete = () => {
    deleteProductById(data._id);
    console.log(products)
  };
  return (
    <div className="bg-white p-4 rounded max-h-64">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
            alt=""
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2 break-words">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayVNDCurrency(data.sellingPrice)}
          </p>

          <div className="flex justify-end">
            <div
              className="ml-au p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className=" ml-au p-2 bg-green-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={handleDelete}
            >
              <FaRegTrashCan onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          // fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
