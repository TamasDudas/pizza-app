import React, { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function OrderForm() {
	const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCartContext();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		address: '',
		email: '',
		aszf_accepted: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));

		// Hiba törlése, ha a felhasználó javít
		const backendFieldName = {
			name: 'customer_name',
			email: 'customer_email',
			phone: 'customer_phone',
			address: 'delivery_address',
			aszf_accepted: 'aszf_accepted',
		}[name];

		if (backendFieldName && errors[backendFieldName]) {
			setErrors((prev) => ({
				...prev,
				[backendFieldName]: null,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		try {
			const orderData = {
				customer_name: formData.name,
				customer_email: formData.email,
				customer_phone: formData.phone,
				delivery_address: formData.address,
				items: cartItems,
				aszf_accepted: formData.aszf_accepted,
				total_price: getTotalPrice(),
			};

			console.log(orderData);

			const response = await api.post('/orders', orderData);

			alert('Megrendelés sikeresen leadva! Rendelésszám: #' + response.data.order.id);

			// Kosár ürítése és vissza a főoldalra
			clearCart();
			navigate('/');
		} catch (error) {
			// Validációs hibák kezelése
			if (error.response?.status === 422) {
				const validationErrors = error.response.data.errors;
				setErrors(validationErrors);
			} else if (error.response) {
				alert('Hiba a megrendelés során: ' + (error.response.data.message || 'Ismeretlen hiba'));
			} else {
				alert('Hálózati hiba a megrendelés során');
			}
		} finally {
			setLoading(false);
		}
	};

	if (cartItems.length === 0) {
		return (
			<div className="container py-5">
				<div className="alert alert-warning">A kosár üres.</div>
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
								className={`form-control ${errors.customer_name ? 'is-invalid' : ''}`}
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
							/>
							{errors.customer_name && <div className="invalid-feedback">{errors.customer_name[0]}</div>}
						</div>

						<div className="mb-3">
							<label htmlFor="phone" className="form-label">
								Telefonszám <span className="text-danger">*</span>
							</label>
							<input
								type="tel"
								className={`form-control ${errors.customer_phone ? 'is-invalid' : ''}`}
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="06301234567"
							/>
							{errors.customer_phone && <div className="invalid-feedback">{errors.customer_phone[0]}</div>}
						</div>

						<div className="mb-3">
							<label htmlFor="address" className="form-label">
								Szállítási cím <span className="text-danger">*</span>
							</label>
							<input
								type="text"
								className={`form-control ${errors.delivery_address ? 'is-invalid' : ''}`}
								id="address"
								name="address"
								value={formData.address}
								onChange={handleChange}
								placeholder="Budapest, 1234 utca 5."
							/>
							{errors.delivery_address && <div className="invalid-feedback">{errors.delivery_address[0]}</div>}
						</div>

						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								E-mail <span className="text-danger">*</span>
							</label>
							<input
								type="email"
								className={`form-control ${errors.customer_email ? 'is-invalid' : ''}`}
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
							/>
							{errors.customer_email && <div className="invalid-feedback">{errors.customer_email[0]}</div>}
						</div>

						<hr className="my-4" />

						<div className="form-check mb-3">
							<input
								type="checkbox"
								className={`form-check-input ${errors.aszf_accepted ? 'is-invalid' : ''}`}
								id="aszf"
								name="aszf_accepted"
								checked={formData.aszf_accepted}
								onChange={handleChange}
							/>
							<label className="form-check-label" htmlFor="aszf">
								Elfogadom az <Link to="/aszf">ÁSZF</Link>-ben foglaltakat <span className="text-danger">*</span>
							</label>
							{errors.aszf_accepted && <div className="invalid-feedback d-block">{errors.aszf_accepted[0]}</div>}
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
								<h5>{getTotalPrice()} Ft</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
