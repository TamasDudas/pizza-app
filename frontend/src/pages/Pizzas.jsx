import React, { useMemo } from 'react';
import { usePizzasContext } from '../context/PizzasContext';
import { useEffect, useState } from 'react';
import PizzaFilter from '../components/PizzaFilter';
import PizzaList from '../components/PizzaList';
import SearchInfo from '../components/SearchInfo';
import debounce from 'lodash.debounce';

export default function Pizzas() {
	const [searchTerm, setSearchTerm] = useState('');
	const searchInputRef = React.useRef(null);
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

	const debouncedSearch = useMemo(() => {
		return debounce((value) => {
			setSearchTerm(value);
			if (value.length >= 3) {
				fetchPizzas(1, value);
			} else if (value.length === 0) {
				fetchPizzas(1, ''); // Üres keresés - mutassa az összes pizzát
			}
			// 1-2 karakter esetén nem csinál API hívást, de beállítja a state-et
		}, 300);
	}, [fetchPizzas]);

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

	useEffect(() => {
		fetchPizzas(1, searchTerm);
	}, [sortBy, direction]);

	// Komponens betöltésekor töltse be a pizzákat
	useEffect(() => {
		fetchPizzas(1, '');
	}, []);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const handleResetSearch = () => {
		setSearchTerm('');
		fetchPizzas(1, '');
		if (searchInputRef.current) {
			searchInputRef.current.value = '';
		}
	};

	if (loading) {
		return <div>A betöltés folyamatban....</div>;
	}

	if (error) {
		return <div>A betöltés sikertelen</div>;
	}

	return (
		<div className="container mt-4">
			<h1 className="text-gray mb-4">Találd meg kedvenc pizzádat</h1>

			<PizzaFilter
				sortBy={sortBy}
				direction={direction}
				setSorting={setSorting}
				searchInputRef={searchInputRef}
				onSearchChange={handleChange}
			/>

			<SearchInfo searchTerm={searchTerm} pizzasCount={pizzas.length} onResetSearch={handleResetSearch} />

			<PizzaList pizzas={pizzas} searchTerm={searchTerm} onResetSearch={handleResetSearch} />

			{/* Pagination */}
			{lastPage > 1 && (
				<nav className="mt-4">
					<ul className="pagination justify-content-center">
						<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
							<button className="page-link" onClick={() => prevPage(searchTerm)} disabled={currentPage === 1}>
								Előző
							</button>
						</li>

						{Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
							<li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
								<button className="page-link" onClick={() => goToPage(page, searchTerm)}>
									{page}
								</button>
							</li>
						))}

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
