import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Acceuil, AddAcount, Blog, Contact} from './index';
import PupblicLayout from './PupblicLayout';
import Error from '../../_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PupblicLayout/>}>
                <Route path="/" element={<Acceuil/>}/>
                <Route path="/add" element={<AddAcount/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path='*' element= { <Error/> }/>
            </Route>
        </Routes>
    );
};

export default PublicRouter;