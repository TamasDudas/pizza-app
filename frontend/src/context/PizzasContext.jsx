/**
 * PizzasContext - React Context a pizzák állapotkezeléséhez
 *
 * Ez a context biztosítja:
 * - Pizzák listájának állapotkezelését
 * - API hívások kezelését (fetchPizzas)
 * - Lapozás funkcionalitását
 * - Rendezési beállításokat
 * - Betöltési és hiba állapotokat
 *
 * Használat: const { pizzas, loading, fetchPizzas } = usePizzasContext();
 */

import { createContext, useContext, useState } from 'react';
import api from '../api';

// Context alapértelmezett értékei - ezeket kapják meg a fogyasztók
const PizzasContext = createContext({
	popularPizzas: [], // Népszerű pizzák listája
	pizzas: [], // Aktuális pizzák listája
	loading: false, // Betöltési állapot
	error: null, // Hibaüzenet
	currentPage: 1, // Aktuális oldal
	lastPage: 1, // Utolsó oldal
	totalPage: 0, // Összes elem száma
	perPage: 6, // Oldalankénti elemek száma
	sortBy: 'popularity', // Rendezés alapja
	direction: 'desc', // Rendezés iránya
	// fetchPopulerPizzas: async () => {}, // Népszerű pizzák lekérése (nem használt)
	fetchPizzas: async () => {}, // Pizzák lekérése API-ból
	setSorting: () => {}, // Rendezés beállítása
	goToPage: () => {}, // Oldal váltás
	nextPage: () => {}, // Következő oldal
	prevPage: () => {}, // Előző oldal
});

export const usePizzasContext = () => {
	const context = useContext(PizzasContext);
	if (!context) {
		throw new Error('Nincs Pizzas context');
	}
	return context;
};

function PizzasProvider({ children }) {
	const [pizzas, setPizzas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	//Lapozás
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [perPage, setPerPage] = useState(6);

	//Szűrés beállítások
	const [sortBy, setSortBy] = useState('popularity');
	const [direction, setDirection] = useState('desc');

	//Minden pizza - API hívás a pizzák lekéréséhez
	const fetchPizzas = async (page = currentPage, searchTerm = '') => {
		setLoading(true); // Betöltési állapot bekapcsolása
		try {
			// URL összeállítása query paraméterekkel
			let url = `/pizzas?page=${page}&per_page=6&sort_by=${sortBy}&direction=${direction}`;
			if (searchTerm) {
				url += `&search=${encodeURIComponent(searchTerm)}`; // Keresési kifejezés hozzáadása
			}
			const response = await api.get(url); // API hívás
			const responseData = response.data; // Laravel válasz feldolgozása

			// State frissítése az API válasz alapján
			setPizzas(responseData.data); // Pizzák listája
			setCurrentPage(responseData.current_page); // Aktuális oldal
			setLastPage(responseData.last_page); // Utolsó oldal
			setTotalPage(responseData.total); // Összes elem
			setLoading(false); // Betöltés vége
		} catch (error) {
			setError('Hiba történt a lekérdezésben'); // Hiba állapot beállítása
		} finally {
			setLoading(false); // Betöltési állapot kikapcsolása minden esetben
		}
	};

	// Rendezés beállítása - frissíti a rendezési paramétereket és újratölti az adatokat
	const setSorting = (newSortingBy, newDirection) => {
		setSortBy(newSortingBy); // Rendezés alapjának beállítása
		setDirection(newDirection); // Rendezés irányának beállítása
		setCurrentPage(1); // Vissza az első oldalra új rendezéskor
	};

	// === PAGINATION FÜGGVÉNYEK ===

	// Adott oldalra ugrás
	const goToPage = (page, searchTerm = '') => {
		if (page >= 1 && page <= lastPage) {
			// Érvényes oldal szám ellenőrzése
			fetchPizzas(page, searchTerm); // Új oldal betöltése
		}
	};

	// Következő oldalra lépés
	const nextPage = (searchTerm = '') => {
		if (currentPage < lastPage) {
			// Ellenőrzés hogy nem az utolsó oldalon vagyunk
			fetchPizzas(currentPage + 1, searchTerm); // Következő oldal betöltése
		}
	};

	// Előző oldalra lépés
	const prevPage = (searchTerm = '') => {
		if (currentPage > 1) {
			// Ellenőrzés hogy nem az első oldalon vagyunk
			fetchPizzas(currentPage - 1, searchTerm); // Előző oldal betöltése
		}
	};

	// Context Provider visszaadása - biztosítja az állapotot és függvényeket a gyermek komponenseknek
	return (
		<PizzasContext.Provider
			value={{
				loading,
				error,
				currentPage,
				lastPage,
				totalPage,
				perPage,
				pizzas,
				sortBy,
				direction,
				setSorting,
				fetchPizzas,
				goToPage,
				nextPage,
				prevPage,
			}}
		>
			{children} {/* Gyermek komponensek renderelése */}
		</PizzasContext.Provider>
	);
}

export default PizzasProvider;
