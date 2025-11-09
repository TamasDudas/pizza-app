import React, { useState } from 'react';
import api from '../../api';

export default function ContactForm() {
	const [formData, setformData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setformData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const emailData = {
				name: formData.name,
				email: formData.email,
				subject: formData.subject,
				message: formData.message,
			};

			const response = await api.post('/contact', emailData);

			console.log('Sikeres küldés:', response.data);
			alert('Üzenet sikeresen elküldve!');

			// Form ürítése
			setformData({
				name: '',
				email: '',
				subject: '',
				message: '',
			});
		} catch (error) {
			console.error('Hiba:', error);
			if (error.response) {
				alert('Hiba: ' + (error.response.data.message || 'Ismeretlen hiba'));
			} else {
				alert('Hálózati hiba történt');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container py-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h1 className="text-center mb-5">Kapcsolatfelvétel</h1>

					<div className="card shadow-sm">
						<div className="card-body p-4">
							<h4 className="card-title mb-4">Írj nekünk üzenetet!</h4>
							{/* FORM */}
							<form onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-md-6">
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
												placeholder="Add meg a neved"
											/>
										</div>
									</div>

									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="email" className="form-label">
												E-mail cím <span className="text-danger">*</span>
											</label>
											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="pelda@email.com"
											/>
										</div>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="subject" className="form-label">
										Tárgy <span className="text-danger">*</span>
									</label>
									<input
										type="text"
										className="form-control"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										placeholder="Mivel kapcsolatban írsz?"
									/>
								</div>

								<div className="mb-4">
									<label htmlFor="message" className="form-label">
										Üzenet <span className="text-danger">*</span>
									</label>
									<textarea
										className="form-control"
										id="message"
										name="message"
										rows="6"
										value={formData.message}
										onChange={handleChange}
										placeholder="Írd ide az üzeneted..."
									></textarea>
								</div>

								<div className="d-grid">
									<button type="submit" className="btn btn-success btn-lg" disabled={loading}>
										{loading ? 'Küldés...' : 'Üzenet küldése'}
									</button>
								</div>
							</form>
						</div>
					</div>

					{/* Kapcsolati információk */}
					<div className="row mt-5">
						<div className="col-md-4 text-center mb-4">
							<div className="card h-100 border-0 bg-light">
								<div className="card-body">
									<i className="fas fa-phone fa-2x text-primary mb-3"></i>
									<h5>Telefon</h5>
									<p className="text-muted">+36 1 234 5678</p>
								</div>
							</div>
						</div>

						<div className="col-md-4 text-center mb-4">
							<div className="card h-100 border-0 bg-light">
								<div className="card-body">
									<i className="fas fa-envelope fa-2x text-primary mb-3"></i>
									<h5>E-mail</h5>
									<p className="text-muted">info@pizzamaker.hu</p>
								</div>
							</div>
						</div>

						<div className="col-md-4 text-center mb-4">
							<div className="card h-100 border-0 bg-light">
								<div className="card-body">
									<i className="fas fa-map-marker-alt fa-2x text-primary mb-3"></i>
									<h5>Cím</h5>
									<p className="text-muted">
										1234 Budapest
										<br />
										Pizza utca 1.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
