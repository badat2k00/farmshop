import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productSlice";
import PaginatedItems from "../components/PaginatedItems";
const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const dispatch = useDispatch();
  // const [allProduct,setAllProduct] = useState([])
  const products = useSelector((state) => state.products.products);
  const { t } = useTranslation();
  const [currentItems, setCurrentItems] = useState(0);
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    if (dataResponse?.data) {
      dispatch(getAllProducts(dataResponse?.data));
    }
    // setAllProduct(dataResponse?.data || [])
  };

  useEffect(() => {
    fetchAllProduct();
    console.log(products);
  }, []);

  return (
    <div className="w-full min-h-screen  pb-3 flex flex-col ">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">{t("AllProduct")}</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          {t("UploadProduct")}
        </button>
      </div>

      {/**all product */}
      <div className="flex justify-start flex-wrap gap-5 p-4 w-full h-[calc(100vh-100px)]">
        {
          // allProduct.map((product,index)=>{
          //   return(
          //     <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>

          //   )
          // })
          currentItems&&currentItems.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} />
            );
          })
        }
        
        
      </div>
      <PaginatedItems 
          itemsPerPage={10}
          setCurrentItems={setCurrentItems}
          items={products}
        />
      {/**upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
