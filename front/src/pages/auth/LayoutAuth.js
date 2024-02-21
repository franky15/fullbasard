import React from 'react';
import {Outlet } from 'react-router-dom';

import HeaderPublic from '../../components/publicPart/HeaderPublic';
import Footer from '../../components/Footer';

const LayoutAuth = () => {
    return (
        <div className='LayoutAuth'>
            <HeaderPublic/>
            <Outlet/>
            <Footer/>
        </div>
       
    );
};

export default LayoutAuth;