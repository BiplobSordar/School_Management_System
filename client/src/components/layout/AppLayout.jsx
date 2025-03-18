import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { useSelector } from 'react-redux'

const AppLayout = () => {
    const user=useSelector((state)=>state.auth.user)

    return (
        
          
        
        <div className='scrollbar-hidden'>
  <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />

            </footer>
        </div>
    )
}

export default AppLayout