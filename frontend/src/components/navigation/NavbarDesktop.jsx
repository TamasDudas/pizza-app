import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarDesktop() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
			<div className="container">
				{/* LOGO */}
				<Link to="/" className="navbar-brand fw-bold text-danger">
					LOGO
				</Link>

				{/* NAVLINKS */}
				<div className="navbar-nav ms-auto">
					<Link to="/" className="nav-link fw-semibold text-dark">
						Főoldal
					</Link>
					<Link to="/kapcsolat" className="nav-link fw-semibold text-dark">
						Kapcsolat
					</Link>
					<Link to="/pizzak" className="nav-link fw-semibold text-dark">
						Pizzák
					</Link>
				</div>
			</div>
		</nav>
	);
}
