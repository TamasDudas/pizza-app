import React from 'react';

/**
 * PizzaFilter komponens - Szűrési és keresési funkciók biztosítása
 *
 * Ez a komponens biztosítja:
 * - Keresési mezőt a pizzák közötti kereséshez (minimum 3 karakter)
 * - Rendezési opciókat név, ár vagy népszerűség szerint
 * - Rendezési irány beállítását (növekvő/csökkenő)
 *
 * Props:
 * - sortBy: Aktuális rendezés alapja
 * - direction: Rendezés iránya
 * - setSorting: Rendezés beállításának függvénye
 * - searchInputRef: Keresési mező referenciája
 * - onSearchChange: Keresés változás kezelője
 */

export default function PizzaFilter({
	sortBy,
	direction,
	setSorting,
	searchInputRef,
	onSearchChange,
}) {
	return (
		<div className="row mb-4">
			<div className="col-md-8">
				<div className="card p-3">
					<h5 className="mb-3">Szűrés és keresés</h5>

					{/* Keresési mező - minimum 3 karakter szükséges a kereséshez */}
					<div className="mb-3">
						<label className="form-label">Keresés:</label>
						<input
							ref={searchInputRef}
							type="text"
							className="form-control"
							placeholder="Keresés pizzák között... (minimum 3 karakter)"
							onChange={onSearchChange}
						/>
					</div>

					{/* Rendezési opciók - név, ár vagy népszerűség szerinti rendezés */}
					<div className="row">
						<div className="col-md-6">
							<label className="form-label">Rendezés alapja:</label>
							<select
								className="form-select"
								value={sortBy}
								onChange={(e) => setSorting(e.target.value, direction)}
							>
								<option value="name">Név szerint</option>
								<option value="price_small">Ár szerint</option>
								<option value="popularity">Népszerűség szerint</option>
							</select>
						</div>
						<div className="col-md-6">
							<label className="form-label">Irány:</label>
							<select
								className="form-select"
								value={direction}
								onChange={(e) => setSorting(sortBy, e.target.value)}
							>
								<option value="asc">Növekvő</option>
								<option value="desc">Csökkenő</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
