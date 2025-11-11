import React, { useMemo, useRef } from 'react';
import { usePizzasContext } from '../context/PizzasContext';
import { useEffect, useState } from 'react';
import PizzaFilter from '../components/PizzaFilter';
import PizzaList from '../components/PizzaList';
import SearchInfo from '../components/SearchInfo';
import debounce from 'lodash.debounce';

/**
 * Pizzas oldal komponens - Pizzák listázása, keresése és szűrése
 *
 * Ez az oldal biztosítja:
 * - Pizzák megjelenítését a PizzasContext segítségével
 * - Keresési funkcionalitást (debounce-olt, minimum 3 karakter)
 * - Rendezési opciókat
 * - Lapozást
 * - Betöltési és hiba állapotokat
 *
 * Használja a PizzasContext-et az adatok és függvények eléréséhez.
 */

export default function Pizzas() {
	const [searchTerm, setSearchTerm] = useState(''); // Keresési kifejezés állapota
	const searchInputRef = useRef(null); // Keresési mező referenciája

	// PizzasContext hook használata - adatok és függvények lekérése
	const {
		pizzas,
		fetchPizzas,
		loading,
		error,
		currentPage,
		lastPage,
		totalPage,
		sortBy,
		direction,
		setSorting,
		goToPage,
		nextPage,
		prevPage,
	} = usePizzasContext();

	// Debounce-olt keresési függvény - 300ms késleltetés, minimum 3 karakter
	const debouncedSearch = useMemo(() => {
		return debounce((value) => {
			if (value.length >= 3) {
				setSearchTerm(value);
				fetchPizzas(1, value); // Keresés az első oldalon
			} else if (value.length === 0) {
				setSearchTerm('');
				fetchPizzas(1, ''); // Üres keresés - mutassa az összes pizzát
			}
			// 1-2 karakter esetén nem csinál semmit
		}, 300);
	}, [fetchPizzas]);

	// Keresés változás kezelője - azonnali üres keresés vagy debounce-olt keresés
	const handleChange = (e) => {
		const value = e.target.value;
		if (value === '') {
			// Ha üres a keresés, azonnal töltse be az eredeti listát
			setSearchTerm('');
			fetchPizzas(1, '');
		} else {
			debouncedSearch(value); // Késleltetett keresés
		}
	};

	// Rendezés változásakor újratöltés az első oldalon
	useEffect(() => {
		fetchPizzas(1, searchTerm);
	}, [sortBy, direction]);

	// Komponens betöltésekor töltse be a pizzákat
	useEffect(() => {
		fetchPizzas(1, '');
	}, []);

	// Cleanup: debounce függvény megszakítása komponens unmountkor
	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	// Keresés visszaállítása - üres keresésre váltás és mező ürítése
	const handleResetSearch = () => {
		setSearchTerm('');
		fetchPizzas(1, '');
		if (searchInputRef.current) {
			searchInputRef.current.value = '';
		}
	};

	// Betöltési állapot kezelése
	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	// Hiba állapot kezelése
	if (error) {
		return <div>A betöltés sikertelen</div>;
	}

	return (
		<div className="container mt-4">
			<h1 className="text-gray mb-4">Találd meg kedvenc pizzádat</h1>

			{/* Szűrési és keresési komponens */}
			<PizzaFilter
				sortBy={sortBy}
				direction={direction}
				setSorting={setSorting}
				searchInputRef={searchInputRef}
				onSearchChange={handleChange}
			/>

			{/* Keresési információk megjelenítése */}
			<SearchInfo searchTerm={searchTerm} pizzasCount={pizzas.length} onResetSearch={handleResetSearch} />

			{/* Pizzák listája */}
			<PizzaList pizzas={pizzas} searchTerm={searchTerm} onResetSearch={handleResetSearch} />

			{/* Lapozás - csak ha több oldal van */}
			{lastPage > 1 && (
				<nav className="mt-4">
					<ul className="pagination justify-content-center">
						{/* Előző oldal gomb */}
						<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
							<button className="page-link" onClick={() => prevPage(searchTerm)} disabled={currentPage === 1}>
								Előző
							</button>
						</li>

						{/* Oldalszám gombok */}
						{Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
							<li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
								<button className="page-link" onClick={() => goToPage(page, searchTerm)}>
									{page}
								</button>
							</li>
						))}

						{/* Következő oldal gomb */}
						<li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
							<button
								className="page-link"
								onClick={() => nextPage(searchTerm)}
								disabled={currentPage === lastPage}
							>
								Következő
							</button>
						</li>
					</ul>
				</nav>
			)}
		</div>
	);
}
