import React, { useState } from 'react';
import api from '../../api';

export default function ContactForm() {
	const [formData, setformData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
		aszf_accepted: false,
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setformData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

		// Hiba törlése, ha a felhasználó javít
		if (errors && errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}
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
				aszf_accepted: formData.aszf_accepted,
			};

			const response = await api.post('/contact', emailData);

			alert('Üzenet sikeresen elküldve!');

			// Form ürítése
			setformData({
				name: '',
				email: '',
				subject: '',
				message: '',
				aszf_accepted: false,
			});
		} catch (error) {
			//Hasonlóan mint a rendelés leadásánál
			if (error.response?.status === 422) {
				const validationErrors = error.response.data.errors;
				setErrors(validationErrors);
				setLoading(false);
			} else {
				alert('Hálózati hiba történt: ' + error.response?.data?.message);
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
												className={`form-control ${errors?.name ? 'is-invalid' : ''}`}
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												placeholder="Add meg a neved"
											/>

											{errors?.name && <div className="invalid-feedback d-block">{errors.name[0]}</div>}
										</div>
									</div>

									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="email" className="form-label">
												E-mail cím <span className="text-danger">*</span>
											</label>
											<input
												type="email"
												className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="pelda@email.com"
											/>
											{errors?.email && <div className="invalid-feedback d-block">{errors.email[0]}</div>}
										</div>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="subject" className="form-label">
										Tárgy <span className="text-danger">*</span>
									</label>
									<input
										type="text"
										className={`form-control ${errors?.subject ? 'is-invalid' : ''}`}
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										placeholder="Mivel kapcsolatban írsz?"
									/>
									{errors?.subject && <div className="invalid-feedback d-block">{errors.subject[0]}</div>}
								</div>

								<div className="mb-4">
									<label htmlFor="message" className="form-label">
										Üzenet <span className="text-danger">*</span>
									</label>
									<textarea
										className={`form-control ${errors?.message ? 'is-invalid' : ''}`}
										id="message"
										name="message"
										rows="6"
										value={formData.message}
										onChange={handleChange}
										placeholder="Írd ide az üzeneted..."
									></textarea>
									{errors?.message && <div className="invalid-feedback d-block">{errors.message[0]}</div>}
								</div>

								<div className="form-check mb-3">
									<input
										type="checkbox"
										className={`form-check-input ${errors?.aszf_accepted ? 'is-invalid' : ''}`}
										id="aszf"
										name="aszf_accepted"
										checked={formData.aszf_accepted}
										onChange={handleChange}
									/>
									<label className="form-check-label" htmlFor="aszf">
										Elfogadom az <strong>ÁSZF</strong>-ben foglaltakat <span className="text-danger">*</span>
									</label>
									{errors?.aszf_accepted && <div className="invalid-feedback d-block">{errors.aszf_accepted[0]}</div>}
								</div>

								<div className="d-grid">
									<button type="submit" className="btn btn-success btn-lg" disabled={loading}>
										{loading ? 'Küldés...' : 'Üzenet küldése'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
