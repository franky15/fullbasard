import React from 'react';
import {Outlet } from 'react-router-dom';

import HeaderAdmin from '../../components/adminPart/HeaderAdmin';
import Footer from '../../components/Footer';

const AdminLayout = () => {
    return (
        <div className='AdminLayout'>
            <HeaderAdmin/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AdminLayout;