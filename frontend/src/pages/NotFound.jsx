import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center my-5">
			<h2>Az oldal nem található</h2>
			<Link to="/" className="btn btn-success w-40 btn-lg mt-4">
				Vissza a főoldalra
			</Link>
		</div>
	);
}
