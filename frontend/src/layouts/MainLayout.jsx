import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDesktop from '../components/navigation/NavbarDesktop';
import NavbarMobile from '../components/navigation/NavbarMobile';

export default function MainLayout() {
	return (
		<div>
			<header className="mb-5">
				<NavbarDesktop />
				<NavbarMobile />
			</header>
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
}
