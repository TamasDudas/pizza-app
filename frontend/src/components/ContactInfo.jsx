import React from 'react';

export default function () {
	return (
		<div>
			<div className="row mt-5">
				<div className="col-md-4 text-center mb-4">
					<div className="card h-100 border-0 bg-light">
						<div className="card-body">
							<i className="fas fa-phone fa-2x text-primary mb-3"></i>
							<h5>Telefon</h5>
							<p className="text-muted">+36 1 2345 5678</p>
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
	);
}
