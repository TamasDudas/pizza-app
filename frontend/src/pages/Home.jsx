import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePizzasContext } from '../context/PizzasContext';

export default function Home() {
	const { pizzas, fetchPizzas, loading, error, setSorting } = usePizzasContext();

	useEffect(() => {
		// Beállítjuk a népszerűség szerinti rendezést
		setSorting('popularity', 'desc');
		// Majd lekérjük a pizzákat
		fetchPizzas(1, '');
	}, []);

	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	if (error) {
		return <div>A betöltés sikertelen</div>;
	}

	return (
		<div className="container mt-4">
			<h1 className="text-success mb-4">Pizza Maker</h1>
			<div className="row row-cols-2 my-5">
				<p className="">
					Találd meg te is a kedvencedet az ország legjobb Pizzázójában. Minőségi alapanyagokkal és kemencében
					sült pizzávál várjuk kedves látogatóinkat.{' '}
				</p>
				<div className="text-center">
					<Link to="/pizzak" className="btn btn-success w-50">
						Megnézem az étlapot
					</Link>
				</div>
			</div>

			<h4 className="mb-4">Népszerű pizzáink:</h4>

			{pizzas.length === 0 ? (
				<div className="text-center">Jelenleg nincs ilyen pizza</div>
			) : (
				<div className="row">
					{pizzas.map((pizza) => (
						<div key={pizza.id} className="col-md-4 mb-4">
							<div className="card h-100">
								<img
									src={pizza.image}
									className="card-img-top"
									alt={pizza.name}
									style={{ height: '200px', objectFit: 'cover' }}
								/>
								<div className="card-body">
									<h5 className="card-title">{pizza.name}</h5>
									<p className="card-text text-muted mb-2">{pizza.description}</p>
									<p className="card-text">
										<small className="text-muted">Feltétek: {pizza.toppings}</small>
									</p>

									<div className="d-flex justify-content-between align-items-center mt-3">
										<span className="text-success fw-bold">{pizza.price_small} Ft-tól</span>
										<small className="text-muted">Népszerűség: {pizza.popularity}</small>
									</div>
								</div>
								<Link to={`/pizzak/${pizza.id}`} className="btn btn-success w-100 btn-lg mt-4">
									Megnézem
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
