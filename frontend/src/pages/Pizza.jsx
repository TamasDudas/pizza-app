import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';
import { useCartContext } from '../context/CartContext';

export default function Pizza() {
	const { pizza, loading, error, fetchPizza } = usePizzaContext();
	const { addTocart } = useCartContext();
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
		if (size === 'small') return pizza.price_small;
		if (size === 'medium') return pizza.price_medium;
		if (size === 'large') return pizza.price_large;
		return null;
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

		addTocart(cartItem);
		navigate('/kosar');
	};

	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	if (error) {
		return <div>A betöltés sikertelen</div>;
	}
	return (
		<>
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

					{/* Méretválasztás */}
					<div className="mt-4">
						<h6>Válassz méretet:</h6>
						<div className="btn-group w-100" role="group">
							<button
								type="button"
								className={`btn ${selectedSize === 'small' ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => setSelectedSize('small')}
							>
								Kis ({pizza.price_small} Ft)
							</button>
							<button
								type="button"
								className={`btn ${selectedSize === 'medium' ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => setSelectedSize('medium')}
							>
								Közepes ({pizza.price_medium} Ft)
							</button>
							<button
								type="button"
								className={`btn ${selectedSize === 'large' ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => setSelectedSize('large')}
							>
								Nagy ({pizza.price_large} Ft)
							</button>
						</div>
					</div>

					{/* Mennyiség */}
					<div className="mt-3">
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
								onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
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

					{/* Kosárba helyezés gomb */}
					<div className="mt-4">
						<button className="btn btn-success w-100" onClick={handleAddToCart} disabled={!selectedSize}>
							Kosárba helyezés
						</button>
					</div>
				</div>
			</div>

			{/*  megerősítés modal a duplikálásra */}
			{showModal && (
				<div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Megerősítés</h5>
								<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
							</div>
							<div className="modal-body">{modalMessage}</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
									Nem
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => {
										setShowModal(false);
										setShowPostAddModal(true);
									}}
								>
									Igen
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Post-add modal */}
			{showPostAddModal && (
				<div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Sikeresen hozzáadva!</h5>
							</div>
							<div className="modal-body">A pizza hozzáadva a kosárhoz.</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => {
										setShowPostAddModal(false);
										setSelectedSize(null);
										setQuantity(1);
									}}
								>
									Vásárlás folytatása
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => {
										window.location.href = '/kosar';
									}}
								>
									Megrendeléshez
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
