import React from "react";

const Footer = () => {
	return (
		<div className="Footer">
			<footer>
				<div className="footer-section taille">
					<div className="icon iconlocal"><i class="fa-solid fa-location-dot"></i></div>
					<div className="memeAdresse">
						<p className="meme1"> 62 rue Henri Bretonnet,</p>
						<p className="meme">78970, Mézières sur seine,</p>
						<p className="meme">France</p>
					</div>
				</div>

				<div className="footer-section taille">
					<div className="icon"><i class="fa-solid fa-phone"></i></div>

					<div className="memeTout">
						<p className="meme">+33.0X.XX.XX.80</p>
					</div>
				</div>
				<div className="footer-section taille">
					<div className="icon"><i class="fa-solid fa-envelope"></i></div>
					<div className="memeTout">
						<p className="meme">fullbasard@yahoo.com</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
