import { createContext, useContext, useState } from 'react';
import api from '../api';

const PizzasContext = createContext({
	popularPizzas: [],
	pizzas: [],
	loading: false,
	error: null,
	currentPage: 1,
	lastPage: 1,
	totalPage: 0,
	perPage: 6,
	sortBy: 'popularity',
	direction: 'desc',
	// fetchPopulerPizzas: async () => {},
	fetchPizzas: async () => {},
	setSorting: () => {},
	goToPage: () => {},
	nextPage: () => {},
	prevPage: () => {},
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

	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [perPage, setPerPage] = useState(6);

	//Szűrés beállítások
	const [sortBy, setSortBy] = useState('popularity');
	const [direction, setDirection] = useState('desc');

	//Minden pizza
	const fetchPizzas = async (page = currentPage) => {
		setLoading(true);
		try {
			const response = await api.get(
				`/pizzas?page=${page}&per_page=6&sort_by=${sortBy}&direction=${direction}`
			);
			const responseData = response.data;
			setPizzas(responseData.data);
			setCurrentPage(responseData.current_page);
			setLastPage(responseData.last_page);
			setTotalPage(responseData.total);
			setLoading(false);
		} catch (error) {
			setError('Hiba történt a lekérdezésben');
		} finally {
			setLoading(false);
		}
	};

	const setSorting = (newSortingBy, newDirection) => {
		setSortBy(newSortingBy);
		setDirection(newDirection);
		setCurrentPage(1);
	};

	// Pagination függvények
	const goToPage = (page) => {
		if (page >= 1 && page <= lastPage) {
			fetchPizzas(page);
		}
	};

	const nextPage = () => {
		if (currentPage < lastPage) {
			fetchPizzas(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			fetchPizzas(currentPage - 1);
		}
	};

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
			{children}
		</PizzasContext.Provider>
	);
}

export default PizzasProvider;
