import React from 'react';
import {Outlet } from 'react-router-dom';

import HeaderPublicAdmin from '../../components/publicPart/HeaderPublicAdmin';
import Footer from '../../components/Footer';

const PublicLayoutAdmin = () => {
    return (
        <div className='PublicLayoutAdmin'>
            <HeaderPublicAdmin/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default PublicLayoutAdmin;