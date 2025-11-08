import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';
import { useCartContext } from '../context/CartContext';
import Modal from '../components/Modal';

export default function Pizza() {
	const { pizza, loading, error, fetchPizza } = usePizzaContext();
	const { addTocart, updateQuantity, cartItems } = useCartContext();
	const navigate = useNavigate();

	const [selectedSize, setSelectedSize] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [showPostAddModal, setShowPostAddModal] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		fetchPizza(id);
	}, [id]);
	console.log(pizza);

	const getSizePrice = (size) => {
		if (!pizza) return null;
		let price = null;
		if (size === 'small') price = pizza.price_small;
		if (size === 'medium') price = pizza.price_medium;
		if (size === 'large') price = pizza.price_large;

		return price ? parseInt(price) : null;
	};

	const handleAddToCart = () => {
		if (!selectedSize) {
			alert('Válassz méretet!');
			return;
		}

		const cartItem = {
			pizza_id: pizza.id,
			pizza_name: pizza.name,
			size: selectedSize,
			price: parseInt(getSizePrice(selectedSize)),
			quantity: parseInt(quantity),
		};

		const result = addTocart(cartItem);

		if (result.exsitingItem) {
			setModalMessage(`${result.massage}. Szeretnéd növelni a mennyiséget ${quantity}-gyel?`);
			setShowModal(true);
		} else {
			setShowPostAddModal(true);
		}
	};

	const handleConfirmAddToExisting = () => {
		// Megkeressük a kosárban lévő tételt és növeljük a mennyiségét
		const existingItem = cartItems.find(
			(item) => item.pizza_id === pizza.id && item.size === selectedSize
		);

		if (existingItem) {
			const newQuantity = existingItem.quantity + quantity;
			updateQuantity(pizza.id, selectedSize, newQuantity);
		}

		setShowModal(false);
		setShowPostAddModal(true);
	};
	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	if (error) {
		return <div>A betöltés sikertelen</div>;
	}

	if (!pizza) {
		return <div>A pizza nem található</div>;
	}
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					{/* Bal oldal - Pizza kép és tulajdonságok */}
					<div className="col-md-6">
						<img
							src={pizza.image}
							className="img-fluid rounded-circle mb-3"
							alt={pizza.name}
							style={{ width: '300px', height: '300px', objectFit: 'cover' }}
						/>
						<h5 className="card-title">{pizza.name}</h5>
						<p className="card-text text-muted mb-2">{pizza.description}</p>
						<p className="card-text">
							<small className="text-muted">Feltétek: {pizza.toppings}</small>
						</p>
						<div className="mt-3">
							<div className="mb-2">
								<span className="text-primary fw-bold">Kis méret: {pizza.price_small || 0} Ft</span>
							</div>
							<div className="mb-2">
								<span className="text-primary fw-bold">Közepes méret: {pizza.price_medium || 0} Ft</span>
							</div>
							<div className="mb-2">
								<span className="text-primary fw-bold">Nagy méret: {pizza.price_large || 0} Ft</span>
							</div>
							<div className="mt-3">
								<small className="text-muted">Népszerűség: {pizza.popularity || 'N/A'}</small>
							</div>
						</div>
					</div>

					{/* Jobb oldal - Felhasználói interakciók */}
					<div className="col-md-6 d-flex align-items-center justify-content-center">
						<div className="card">
							<div className="card-body">
								{/* Méretválasztás */}
								<div className="mb-4">
									<h6>Válassz méretet:</h6>
									<div className="btn-group w-100" role="group">
										<button
											type="button"
											className={`btn ${selectedSize === 'small' ? 'btn-primary' : 'btn-outline-primary'}`}
											onClick={() => setSelectedSize('small')}
										>
											Kis ({pizza.price_small || 0} Ft)
										</button>
										<button
											type="button"
											className={`btn ${selectedSize === 'medium' ? 'btn-primary' : 'btn-outline-primary'}`}
											onClick={() => setSelectedSize('medium')}
										>
											Közepes ({pizza.price_medium || 0} Ft)
										</button>
										<button
											type="button"
											className={`btn ${selectedSize === 'large' ? 'btn-primary' : 'btn-outline-primary'}`}
											onClick={() => setSelectedSize('large')}
										>
											Nagy ({pizza.price_large || 0} Ft)
										</button>
									</div>
								</div>

								{/* Mennyiség */}
								<div className="mb-4">
									<h6>Mennyiség:</h6>
									<div className="input-group" style={{ width: '150px' }}>
										<button
											className="btn btn-outline-secondary"
											type="button"
											onClick={() => setQuantity(Math.max(1, quantity - 1))}
										>
											−
										</button>
										<input
											type="number"
											className="form-control text-center"
											value={quantity}
											onChange={(e) => {
												const val = Number(e.target.value);
												setQuantity(Math.max(1, Math.min(10, isNaN(val) ? 1 : val)));
											}}
											min="1"
											max="10"
										/>
										<button
											className="btn btn-outline-secondary"
											type="button"
											onClick={() => setQuantity(Math.min(10, quantity + 1))}
										>
											+
										</button>
									</div>
								</div>

								{/* Összesített ár */}
								{selectedSize && (
									<div className="mb-4">
										<h6>Összesen: {getSizePrice(selectedSize) * (Number(quantity) || 1)} Ft</h6>
									</div>
								)}

								{/* Kosárba helyezés gomb */}
								<div className="mt-auto">
									<button className="btn btn-success w-100 btn-lg" onClick={handleAddToCart} disabled={!selectedSize}>
										Kosárba helyezés
									</button>
									{cartItems.length > 0 && (
										<Link className="btn btn-success w-100 btn-lg mt-4" to="/kosar">
											Megrendelés
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Megerősítés modal a duplikálásra */}
			{showModal && (
				<Modal
					title={'Megerősítés'}
					text={modalMessage}
					firstBtnText={'Nem'}
					scndBtnText={'Igen'}
					frstOnClick={() => setShowModal(false)}
					scndOnClick={handleConfirmAddToExisting}
				/>
			)}

			{/* Post-add modal */}
			{showPostAddModal && (
				<Modal
					title={'Sikeres kosárba helyezés'}
					text={'A terméket sikeresen a kosárba helyezted'}
					firstBtnText={'Vissza'}
					scndBtnText={'Megrendelés'}
					frstOnClick={() => {
						setShowPostAddModal(false);
						setSelectedSize(null);
						setQuantity(1);
					}}
					scndOnClick={() => {
						navigate('/kosar');
					}}
				/>
			)}
		</>
	);
}
