
import React, { useState, useEffect } from "react";
import PaginatedItems from "../components/PaginatedItems";
import moment from "moment";
import SummaryApi from "../common";
import ChangeUserRole from "../components/ChangeUserRole";
import { toast } from "react-toastify";

import { MdModeEdit } from "react-icons/md";
const AllUsers = () => {
  const [currentItems, setCurrentItems] = useState(0);
  const [allUser, setAllUsers] = useState([]);

 
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      <div>
        <div className="bg-white pb-4">
          <div className="w-full text-center">
            <h1 className="text-2xl">Quản lý tài khoản </h1>
          </div>
          <table className="w-full userTable h-[calc(100vh-100px)]">
            <thead>
              <tr className="bg-black text-white">
             <th>Mã người dùng</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Xác thực Email</th>
                <th>Ngày đăng ký</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {currentItems &&
                currentItems.map((el, index) => {
                  return (
                    <tr>
                      <td>{el?._id}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
             
                      <td>{el?.isGoogleLink?"Có":"Chưa"}</td>
                      <td>{moment(el?.createdAt).format("LL")}</td>
                      <td>
                       
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <PaginatedItems
          itemsPerPage={13}
          setCurrentItems={setCurrentItems}
          items={allUser}
        />
      </div>

      

    </>
  );
};

export default AllUsers;
