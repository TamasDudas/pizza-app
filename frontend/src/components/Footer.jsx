import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<div>
			<div className="row row-cols-3 ">
				<div className="d-flex flex-column justify-content-center align-items-center gap-2">
					<i className="fas fa-phone fa-2x text-primary mb-3 "></i>
					<h5 className="text-white">Telefon</h5>
					<p className="text-white">+36 1 2345 5678</p>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center gap-2">
					<i className="fas fa-envelope fa-2x text-primary mb-3"></i>
					<h5 className="text-white">E-mail</h5>
					<p className="text-white">info@pizzamaker.hu</p>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center gap-2">
					<i className="fas fa-map-marker-alt fa-2x text-primary mb-3"></i>
					<h5 className="text-white">Cím</h5>
					<p className="text-white">
						1234 Budapest
						<br />
						Pizza utca 1.
					</p>
				</div>
			</div>
			<div className="py-3 text-center ">
				<Link to="/aszf" className="link-underline-light text-white">
					Adatvédelmi tájékoztató
				</Link>
			</div>
		</div>
	);
}
