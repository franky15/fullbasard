import React from 'react';
import {Outlet } from 'react-router-dom';

import HeaderPublic from '../../components/publicPart/HeaderPublic';
import HeaderPublicAdmin from '../../components/publicPart/HeaderPublicAdmin';
import Footer from '../../components/Footer';

const PupblicLayout = () => {
    return (
        <div className='PupblicLayout'>
            <HeaderPublic/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default PupblicLayout;