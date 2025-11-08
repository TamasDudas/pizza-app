import React from 'react';
import { useCartContext } from '../context/CartContext';

export default function Cart() {
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

	return (
		<div className="container py-5">
			<h2 className="mb-4">Kosár ({getTotalItems()} tétel)</h2>

			<div className="table-responsive">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Pizza</th>
							<th>Méret</th>
							<th>Ár</th>
							<th>Mennyiség</th>
							<th>Összesen</th>
							<th>Műveletek</th>
						</tr>
					</thead>
					<tbody>
						{cartItems.map((item, index) => (
							<tr key={index}>
								<td>{item.pizza_name}</td>
								<td>
									{item.size === 'small' && 'Kis'}
									{item.size === 'medium' && 'Közepes'}
									{item.size === 'large' && 'Nagy'}
								</td>
								<td>{item.price} Ft</td>
								<td>
									<div className="input-group" style={{ width: '120px' }}>
										<button
											className="btn btn-outline-secondary btn-sm"
											type="button"
											onClick={() => updateQuantity(item.pizza_id, item.size, Math.max(1, item.quantity - 1))}
										>
											−
										</button>
										<input
											type="number"
											className="form-control form-control-sm text-center"
											value={item.quantity}
											onChange={(e) => updateQuantity(item.pizza_id, item.size, parseInt(e.target.value) || 1)}
											min="1"
										/>
										<button
											className="btn btn-outline-secondary btn-sm"
											type="button"
											onClick={() => updateQuantity(item.pizza_id, item.size, item.quantity + 1)}
										>
											+
										</button>
									</div>
								</td>
								<td className="fw-bold">{item.price * item.quantity} Ft</td>
								<td>
									<button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.pizza_id, item.size)}>
										Törlés
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="row mt-4">
				<div className="col-md-6"></div>
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Összesítés</h5>
							<p className="mb-2">
								<strong>Tétel összesen:</strong> {getTotalItems()} db
							</p>
							<h4 className="text-primary">
								<strong>Végösszeg:</strong> {getTotalPrice()} Ft
							</h4>
							<button className="btn btn-success w-100 mt-3">Megrendeléshez</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
