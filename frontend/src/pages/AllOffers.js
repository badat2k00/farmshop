import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import SummaryApi from "../common";
import AdminOfferCard from "../components/AdminOfferCard";
import UploadOffer from "../components/UploadOffer";
import PaginatedItems from "../components/PaginatedItems";
const AllOffers = () => {
  const [openUploadOffer, setOpenUploadOffer] = useState(false);
  const [offers, setOffers] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const [currentItems, setCurrentItems] = useState(0);
  const fetchAllOffers = async () => {
    const response = await fetch(SummaryApi.getAllOffers.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);
    console.log(dataResponse.data);
    setOffers(dataResponse?.data || []);
  };
  const fetchOfferByUser = async () => {
    const dataResponse = await fetch(SummaryApi.getOfferByUser.url, {
      method: SummaryApi.getOfferByUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await dataResponse.json();
    console.log(dataApi.data);
    if (dataApi.success && dataApi.data) {
      console.log("Success");
      setOffers(dataApi.data);
      console.log(dataApi.data);
    }

    if (dataApi.error) {
      console.log("Failed");
    }
  };
  useEffect(() => {
    if (user?.role === ROLE.ADMIN) {
      fetchAllOffers();
    } else {
      fetchOfferByUser();
    }
  }, [user]);
  return (
    <>

      {user?.role === ROLE.ADMIN && (
        <div className="w-auto h-screen flex flex-col ">
          <div className="bg-white py-2 px-4 flex justify-between items-center">
            <h2 className="font-bold text-lg">Ưu đãi</h2>
            <button
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
              onClick={() => setOpenUploadOffer(true)}
            >
              Thêm ưu đãi mới
            </button>
          </div>

          {/** all product */}
          <div className="  flex justify-start items-start flex-wrap gap-3 p-4 h-[calc(100vh-100px)] ">
            {offers.map((offer, index) => {
              return (
                <AdminOfferCard
                  data={offer}
                  key={index + "allProduct"}
                  fetchdata={fetchAllOffers}
                />
              );
            })}
          </div>
          <PaginatedItems
            itemsPerPage={5}
            setCurrentItems={setCurrentItems}
            items={offers}
          />

          <div></div>
          {/** upload product component */}
          {openUploadOffer && (
            <UploadOffer
              onClose={() => setOpenUploadOffer(false)}
              fetchData={fetchAllOffers}
            />
          )}
        </div>
      )}

      {user?.role !== ROLE.ADMIN && (
        <>
          <div className="bg-white  py-2 px-4 flex  gap-2 h-[calc(100vh-150px)]">
            {offers.map((offer, index) => {
              return (
                <div>
                  

                  <div className=" p-4 rounded ">
                    <div className="w-40">
                      <div className="w-32 h-32 flex justify-center items-center bg-white">
                        
                      </div>
                      <h1 className="text-ellipsis line-clamp-2 break-words">{offer.code}</h1>

                      <div>
                        <p className="font-semibold">
                          {/* {displayVNDCurrency(data.sellingPrice)} */}
                          {offer.discountType==="fixed"&&offer.discountValue}
                        </p>
                        <h1>{offer.expireDate}</h1>
                        <h1>{offer.detail}</h1>
                        <h1> {offer.discountType==="percentage" && "Giảm giá tối đa :" +offer.maxDiscountMoney}</h1>
                        {offer.expireDate}
                       
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <PaginatedItems
            itemsPerPage={5}
            setCurrentItems={setCurrentItems}
            items={offers}
          />
        </>
      )}
    </>
  );
};

export default AllOffers;
