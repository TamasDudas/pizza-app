import React, { useState, useEffect } from 'react';
import api from '../api';
import { usePizzasContext } from '../context/PizzasContext';

export default function Home() {
	const { popularPizzas, fetchPopulerPizzas, loading, error } = usePizzasContext();

	useEffect(() => {
		fetchPopulerPizzas();
	}, []);

	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	if (error) {
		return <div>A betöltés sikertelen</div>;
	}

	return (
		<div className="container mt-4">
			<h1 className="text-primary mb-4">Pizza Maker</h1>
			<h2 className="mb-4">Népszerű pizzák</h2>

			{popularPizzas.length === 0 ? (
				<div className="text-center">Jelenleg nincs ilyen pizza</div>
			) : (
				<div className="row">
					{popularPizzas.map((popularPizza) => (
						<div key={popularPizza.id} className="col-md-4 mb-4">
							<div className="card h-100">
								<img
									src={popularPizza.image}
									className="card-img-top"
									alt={popularPizza.name}
									style={{ height: '200px', objectFit: 'cover' }}
								/>
								<div className="card-body">
									<h5 className="card-title">{popularPizza.name}</h5>
									<p className="card-text text-muted mb-2">{popularPizza.description}</p>
									<p className="card-text">
										<small className="text-muted">Feltétek: {popularPizza.toppings}</small>
									</p>

									<div className="d-flex justify-content-between align-items-center mt-3">
										<span className="text-primary fw-bold">{popularPizza.price_small} Ft-tól</span>
										<small className="text-muted">Népszerűség: {popularPizza.popularity}</small>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
