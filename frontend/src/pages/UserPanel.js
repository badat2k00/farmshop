import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser,FaAngleDown,FaAngleUp } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { useTranslation } from 'react-i18next';

const UserPanel = () => {
    const [isOpen,setOpen]=useState(false)
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    const {t}=useTranslation();

    useEffect(()=>{
        if(user?.role !== ROLE.GENERAL){
            navigate("/")
        }
    },[user,navigate])

    const handleOpen=()=>{
        setOpen(!isOpen)
    }
  return (
    <div className='h-screen md:flex hidden'>

        <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center mt-3'>
                        {
                        user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser/>
                        )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"personal-information"} className='px-2 py-1 hover:bg-slate-100'>Personal Information</Link>
                        <Link to={"all-orders"} className='px-2 py-1 hover:bg-slate-100 flex justify-between items-center' onMouseEnter={handleOpen}>Đơn hàng {isOpen?<FaAngleDown className='text-xs'/>:<FaAngleUp className='text-xs'/>}</Link>
                        {!isOpen&&<div className='px-2 py-1 flex flex-col '>
                            <div>Đơn hàng chờ thanh toán</div>
                            <div>Đơn hàng đã thanh toán</div>
                            <div>Đơn hàng đã hủy</div>
                        </div>}
                        {/* Tạo mã pin và đổi mật khẩu */}
        
                        <Link className='px-2 py-1 hover:bg-slate-100' to={"all-offers"}>Ưu đãi</Link>
                        <Link className='px-2 py-1 hover:bg-slate-100' to={"change-password"}>Đổi mật khẩu </Link>
                        <Link to={"change-pin"}className='px-2 py-1 hover:bg-slate-100'>Tạo mã PIN</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default UserPanel