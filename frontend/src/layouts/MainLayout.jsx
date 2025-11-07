import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDesktop from '../components/navigation/NavbarDesktop';

export default function MainLayout() {
	return (
		<div>
			<header>
				<NavbarDesktop />
			</header>
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
}
