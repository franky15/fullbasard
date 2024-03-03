import React from 'react';
import { Route, Routes } from "react-router-dom";

import { GetAllArticles,GetOneArticle } from '../adminPages/blog';
import Acceuil from './Acceuil';
import Error from '../../_utils/Error';

const PublicRouterAdmin = () => {
    return (
        <Routes>
			<Route index element={<GetAllArticles />} />
			<Route path="blog">
				<Route index element={<GetAllArticles />} />
				<Route path="articles" element={<GetAllArticles />} />
				<Route path="articles/:id" element={<GetOneArticle />} />
				<Route path="*" element={<Error />} />
			</Route>
            <Route path="*" element={<Error />} />
		</Routes>
    );
};

export default PublicRouterAdmin;