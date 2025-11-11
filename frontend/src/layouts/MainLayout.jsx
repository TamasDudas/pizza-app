import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDesktop from '../components/navigation/NavbarDesktop';
import NavbarMobile from '../components/navigation/NavbarMobile';
import Footer from '../components/Footer';

export default function MainLayout() {
	return (
		<div>
			<header className="mb-5">
				<NavbarDesktop />
				<NavbarMobile />
			</header>
			<main className="container" style={{ minHeight: '75vh' }}>
				<Outlet />
			</main>
			<footer className="container-fluid mt-4" style={{ backgroundColor: '#154d35' }}>
				<Footer />
			</footer>
		</div>
	);
}
