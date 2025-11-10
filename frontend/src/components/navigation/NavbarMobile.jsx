import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function NavbarMobile() {
	const { getTotalItems } = useCartContext();
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const handleMobileMenu = () => {
		console.log('Hello');
		setShowMobileMenu(!showMobileMenu);
	};

	return (
		<nav className="navbar navbar-light d-flex flex-column bg-white d-md-none shadow-sm">
			<div className="container d-flex justify-content-between align-items-center">
				{/* LOGO */}
				<Link to="/" className="navbar-brand fw-bold text-danger m-0">
					LOGO
				</Link>
				<div className="d-flex  justify-content-evenly gap-5">
					<div>
						<span style={{ cursor: 'pointer' }} onClick={handleMobileMenu}>
							{!showMobileMenu ? 'Menu' : 'Close'}
						</span>
					</div>
					{/* KOSÁR */}
					<div>
						<Link to="/kosar" className="nav-link ">
							<i className="bi bi-cart3 fw-semibold  text-dark"></i>
							{getTotalItems() > 0 && (
								<span className=" badge rounded-pill bg-success py-2">Kosár: {getTotalItems()}</span>
							)}
						</Link>
					</div>
				</div>
			</div>
			{showMobileMenu && (
				<div className="d-flex flex-column gap-3">
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
			)}
		</nav>
	);
}
