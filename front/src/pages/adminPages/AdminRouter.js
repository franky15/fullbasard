import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../../_utils/Error";

import {
	GetAllArticles,
	GetOneArticle,
	UpdateOneArticle,
	DeleteOneArticle,
	AddOnArticle,
} from "./blog";

import DashBoard from "./DashBoard";

const AdminRouter = () => {
	return (
		<Routes>
			<Route index element={<DashBoard />} />
			<Route path="blog">
				<Route index element={<GetAllArticles />} />
				<Route path="articles" element={<GetAllArticles />} />
				<Route path="articles/:id" element={<GetOneArticle />} />
				<Route path="add" element={<AddOnArticle />} />
				<Route path="update/:id" element={<UpdateOneArticle />} />
				<Route path="delete/:id" element={<DeleteOneArticle />} />
				<Route path="*" element={<Error />} />
			</Route>
            <Route path="*" element={<Error />} />
		</Routes>
	);
};

export default AdminRouter;
