import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

export default function Cart() {
	const navigate = useNavigate();
	const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } =
		useCartContext();

	if (cartItems.length === 0) {
		return (
			<div className="container py-5">
				<h2>Kosár</h2>
				<p className="text-muted">A kosár üres.</p>
			</div>
		);
	}
}
