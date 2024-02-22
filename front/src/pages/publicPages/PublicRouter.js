import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Acceuil, AddAcount, Blog, Contact} from './index';
import {
	GetAllArticles,
	GetOneArticle,
	
} from "../adminPages/blog/index";

import PupblicLayout from './PupblicLayout';
import Error from '../../_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PupblicLayout/>}>
                <Route path="/" element={<Acceuil/>}/>
                <Route path="/sigh" element={<AddAcount/>}/>
                <Route path="/contact" element={<Contact/>}/>

              
				<Route path="blog/articles" element={<GetAllArticles />} />
				<Route path="blog/articles/:id" element={<GetOneArticle />} />
                <Route path='*' element= { <Error/> }/>
            </Route>
        </Routes>
    );
};

export default PublicRouter;