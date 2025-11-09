import React from 'react';
import { usePizzasContext } from '../context/PizzasContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PizzaFilter from '../components/PizzaFilter';

export default function Pizzas() {
	const {
		pizzas,
		fetchPizzas,
		loading,
		error,
		currentPage,
		lastPage,
		totalPage,
		sortBy,
		direction,
		setSorting,
		goToPage,
		nextPage,
		prevPage,
	} = usePizzasContext();

	useEffect(() => {
		fetchPizzas(1);
	}, [sortBy, direction]);

	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	if (error) {
		return <div>A betöltés sikertelen</div>;
	}
	return (
		<div className="container mt-4">
			<h1 className="text-gray mb-4">Találd meg kedvenc pizzádat</h1>
			<PizzaFilter sortBy={sortBy} direction={direction} setSorting={setSorting} />

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
										<span className="text-primary fw-bold">{pizza.price_small} Ft-tól</span>
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

			{/* Pagination */}
			{lastPage > 1 && (
				<nav className="mt-4">
					<ul className="pagination justify-content-center">
						<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
							<button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
								Előző
							</button>
						</li>

						{Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
							<li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
								<button className="page-link" onClick={() => goToPage(page)}>
									{page}
								</button>
							</li>
						))}

						<li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
							<button className="page-link" onClick={nextPage} disabled={currentPage === lastPage}>
								Következő
							</button>
						</li>
					</ul>
				</nav>
			)}
		</div>
	);
}
