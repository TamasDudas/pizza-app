import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

export default function NavbarDesktop() {
	const { getTotalItems } = useCartContext();
	return (
		<nav className="navbar d-none d-md-inline navbar-light bg-white shadow-sm">
			<div className="container d-flex justify-content-between align-items-center py-3">
				{/* LOGO */}
				<Link to="/" className="navbar-brand fw-bold text-danger m-0">
					LOGO
				</Link>

				{/* MENÜ + KOSÁR WRAPPER */}
				<div className="d-flex align-items-center gap-4">
					{/* MENÚ */}
					<div className="d-flex gap-3">
						<Link to="/" className="nav-link fw-semibold text-dark m-0">
							Főoldal
						</Link>
						<Link to="/kapcsolat" className="nav-link fw-semibold text-dark m-0">
							Kapcsolat
						</Link>
						<Link to="/pizzak" className="nav-link fw-semibold text-dark m-0">
							Pizzák
						</Link>
					</div>
					{/* KOSÁR */}
					<div>
						<Link to="/kosar" className="nav-link position-relative m-0">
							<i className="bi bi-cart3 fw-semibold text-dark"></i>
							{getTotalItems() > 0 && (
								<span className=" badge rounded-pill bg-success  py-2">Kosár: {getTotalItems()}</span>
							)}
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
