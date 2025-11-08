import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';

export default function Pizza() {
	const { id } = useParams();

	const { pizza, loading, error, fetchPizza } = usePizzaContext();

	useEffect(() => {
		fetchPizza(id);
	}, [id]);
	console.log(pizza);

	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	if (error) {
		return <div>A betöltés sikertelen</div>;
	}
	return (
		<div className="">
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
					<span className="text-primary fw-bold">Kis méret: {pizza.price_small} Ft-tól</span>
					<small className="text-muted">Népszerűség: {pizza.popularity}</small>
				</div>
				<div className="d-flex justify-content-between align-items-center mt-3">
					<span className="text-primary fw-bold">Közepes méret: {pizza.price_medium} Ft-tól</span>
				</div>
				<div className="d-flex justify-content-between align-items-center mt-3">
					<span className="text-primary fw-bold">Nagy méret: {pizza.price_large} Ft-tól</span>
				</div>
			</div>
		</div>
	);
}
