import React from 'react'
import Navebar from '../components/NaveBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const AppLayout = () => {
    return (
        <>
            <Navebar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AppLayout;