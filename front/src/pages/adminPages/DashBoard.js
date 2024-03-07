import React from "react";

const DashBoard = () => {
	return (
		<div className="DashBoard">
			<section class="blog">
				<section class="publication">
					<h1 class="h1articles">Articles</h1>
					<div class="article">
						<h2 class="titreArticle">SEO</h2>
					</div>
				</section>

				<section class="recherche">
					<div class="barREcherche">
						<button class="clear-button" onclick="clearSearch()">X</button>
						<input type="text" class="search-input" placeholder="Recherche..."/>
						<button class="search-button">Rechercher</button>
						<div class="search-buttons"></div>
					</div>
					<section class="puce">
						<h2 class="category-title">Catégories</h2>
						<ul class="categories-list">
							<li class="category-item" onclick="navigateTo('all-articles')">Tous les articles</li>
							<li class="category-item" onclick="navigateTo('e-commerce')">E-commerce</li>
							<li class="category-item" onclick="navigateTo('product-owner')">Product Owner</li>
							<li class="category-item" onclick="navigateTo('front-end-developer')">Développeur Front-End</li>
							<li class="category-item" onclick="navigateTo('back-end-developer')">Développeur Back-End</li>
						</ul>
					</section>
				</section>
			</section>
		</div>
	);
};

export default DashBoard;
