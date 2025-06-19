import React, { useEffect ,useState} from "react";
import CategoryList from "../components/CategoryList";
// import BannerProduct from "../components/BannerProduct";
// import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import Promote from "../components/Offer";
import productCategory from '../helpers/productCategory'

const Home = () => {
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    productCategory().then(category=>setCategories(category))
  },[])
  return (
    <div>
      <CategoryList />
      <Promote />
      
      {/* <HorizontalCardProduct category="Phân bón" heading={"Phân bón"} />
      <HorizontalCardProduct category="Hạt giống" heading={"Hạt giống"} />

      <VerticalCardProduct
        category="Thuốc bảo vệ thực vật"
        heading={"Thuốc bảo vệ thực vật"}
      />
      <VerticalCardProduct category="Dụng cụ làm vườn" heading={"Dụng cụ làm vườn"} />
      <VerticalCardProduct category="Khay chậu" heading={"Khay chậu"} />
      <VerticalCardProduct category="Cây giống" heading={"Cây giống"} />
      <VerticalCardProduct category="Hệ thống tưới" heading={"Hệ thống tưới"} />
      <VerticalCardProduct category="Giá thể" heading={"Giá thể"} />
      <VerticalCardProduct category="Đất trồng" heading={"Đất trồng"} />
      <VerticalCardProduct category="Chế phẩm sinh học" heading={"Chế phẩm sinh học"} /> */}






      {categories.map(category=><>
      <VerticalCardProduct category={category.categoryName} heading={category?.categoryName} />
      
      </>)}
      <VerticalCardProduct category={"Khác"} heading={"Khác"} />
    </div>
  );
};

export default Home;
