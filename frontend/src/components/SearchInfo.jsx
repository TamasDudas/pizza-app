import React from 'react';

export default function SearchInfo({ searchTerm, pizzasCount, onResetSearch }) {
	if (!searchTerm || searchTerm.length < 3) {
		return null;
	}

	return (
		<div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
			<span>
				<i className="bi bi-search me-2"></i>
				Keresési eredmények: "<strong>{searchTerm}</strong>"
				{pizzasCount > 0 && <span className="ms-2">({pizzasCount} találat)</span>}
			</span>
			<button className="btn btn-outline-primary btn-sm" onClick={onResetSearch}>
				<i className="bi bi-x-circle me-1"></i>
				Összes pizza
			</button>
		</div>
	);
}
