import React, { useState } from 'react';
import { useCartContext } from '../context/CartContext';

export default function OrderForm() {
	const { cartItems, getTotalPrice, getTotalItems } = useCartContext();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		address: '',
		email: '',
		aszf: false,
		privacy: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validáció
		if (!formData.name || !formData.phone || !formData.address || !formData.email) {
			alert('Kérlek töltsd ki az összes mezőt!');
			return;
		}

		if (!formData.aszf || !formData.privacy) {
			alert('Kérlek fogadd el az ÁSZF-et és az adatvédelmi tájékoztatót!');
			return;
		}

		setLoading(true);

		try {
			// TODO: Backend API call
			console.log('Megrendelés adatok:', {
				...formData,
				items: cartItems,
				total: getTotalPrice(),
			});

			alert('Megrendelés sikeresen leadva!');
			// TODO: Clear cart + redirect to home
		} catch (error) {
			alert('Hiba a megrendelés során');
		} finally {
			setLoading(false);
		}
	};

	if (cartItems.length === 0) {
		return (
			<div className="container py-5">
				<div className="alert alert-warning">A kosár üres. Kérlek adjon hozzá pizzákat!</div>
			</div>
		);
	}

	return (
		<div className="container py-5">
			<div className="row">
				<div className="col-md-8">
					<h2 className="mb-4">Rendelés leadása</h2>

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Név <span className="text-danger">*</span>
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="phone" className="form-label">
								Telefonszám <span className="text-danger">*</span>
							</label>
							<input
								type="tel"
								className="form-control"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="06301234567"
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="address" className="form-label">
								Szállítási cím <span className="text-danger">*</span>
							</label>
							<input
								type="text"
								className="form-control"
								id="address"
								name="address"
								value={formData.address}
								onChange={handleChange}
								placeholder="Budapest, 1234 utca 5."
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								E-mail <span className="text-danger">*</span>
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<hr className="my-4" />

						<div className="form-check mb-3">
							<input
								type="checkbox"
								className="form-check-input"
								id="aszf"
								name="aszf"
								checked={formData.aszf}
								onChange={handleChange}
								required
							/>
							<label className="form-check-label" htmlFor="aszf">
								Elfogadom az <strong>ÁSZF</strong>-ben foglaltakat <span className="text-danger">*</span>
							</label>
						</div>

						<div className="form-check mb-4">
							<input
								type="checkbox"
								className="form-check-input"
								id="privacy"
								name="privacy"
								checked={formData.privacy}
								onChange={handleChange}
								required
							/>
							<label className="form-check-label" htmlFor="privacy">
								Elfogadom az <strong>adatvédelmi tájékoztatóban</strong> foglaltakat{' '}
								<span className="text-danger">*</span>
							</label>
						</div>

						<button type="submit" className="btn btn-success w-100 btn-lg" disabled={loading}>
							{loading ? 'Feldolgozás...' : 'Megrendelés leadása'}
						</button>
					</form>
				</div>

				<div className="col-md-4">
					<div className="card sticky-top" style={{ top: '20px' }}>
						<div className="card-body">
							<h5 className="card-title">Rendelés összesítő</h5>
							<ul className="list-group list-group-flush">
								{cartItems.map((item, index) => (
									<li key={index} className="list-group-item d-flex justify-content-between">
										<span>
											{item.pizza_name} ({item.size === 'small' ? 'Kis' : item.size === 'medium' ? 'Közepes' : 'Nagy'}) x
											{item.quantity}
										</span>
										<strong>{item.price * item.quantity} Ft</strong>
									</li>
								))}
							</ul>
							<hr />
							<div className="d-flex justify-content-between mb-2">
								<strong>Tétel:</strong>
								<strong>{getTotalItems()} db</strong>
							</div>
							<div className="d-flex justify-content-between">
								<h5>Végösszeg:</h5>
								<h5 className="text-danger">{getTotalPrice()} Ft</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
