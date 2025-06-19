import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const NotFound = () => {
  const currentUser = useSelector((state) => state?.user?.user);
  return (
    <>
      <div>Not Found</div>
      <div>{currentUser?.role!=='ADMIN' ?(<Link to="/">Mua hàng tiếp </Link>)  : <Link to="/admin-panel">Trở lại </Link>}</div>
    </>
  );
};

export default NotFound;
