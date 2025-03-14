import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { useSelector } from 'react-redux'

const AppLayout = () => {
    const user=useSelector((state)=>state.auth.user)




    // useEffect(()=>{
    //     switch (user.role) {
    //         case "admin":
    //           navigate("/admin");
    //           break;
    //         case "student":
    //           navigate("/student");
    //           break;
    //         case "teacher":
    //           navigate("/teacher");
    //           break;
    //         case "parent":
    //           navigate("/parent");
    //           break;
    //         default:
    //           navigate("/");
    //       }
    // },[])




   
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />

            </footer>
        </>
    )
}

export default AppLayout