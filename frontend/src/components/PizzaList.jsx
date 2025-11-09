import { Link } from 'react-router-dom';

export default function PizzaList({ pizzas, searchTerm, onResetSearch }) {
	if (pizzas.length === 0) {
		if (searchTerm && searchTerm.length >= 3) {
			return (
				<div className="text-center py-5">
					<h5>Nincs találat a "{searchTerm}" keresésre</h5>
					<p className="text-muted">Próbálj meg más kulcsszavakat használni!</p>
					<button className="btn btn-outline-success" onClick={onResetSearch}>
						Összes pizza megjelenítése
					</button>
				</div>
			);
		} else if (searchTerm && searchTerm.length < 3) {
			return (
				<div className="text-center py-5">
					<h5>Írj be legalább 3 karaktert a kereséshez</h5>
					<p className="text-muted">
						Jelenleg: "{searchTerm}" ({searchTerm.length} karakter)
					</p>
				</div>
			);
		}
		return <div className="text-center">Jelenleg nincs pizza</div>;
	}

	return (
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
	);
}
