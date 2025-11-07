import { createContext, useContext, useState } from 'react';
import api from '../api';

const PizzasContext = createContext({
	popularPizzas: null,
	loading: false,
	error: null,
	success: null,
	successMessage: null,
	fetchPizzas: async () => {},
});

export const usePizzasContext = () => {
	const context = useContext(PizzasContext);
	if (!context) {
		throw new Error('Nincs Pizzas context');
	}
	return context;
};

function PizzasProvider({ children }) {
	const [popularPizzas, setpopularPizzas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const fetchPizzas = async () => {
		setLoading(true);
		try {
			const response = await api.get('/pizzas?sort_by=popularity&direction=desc&per_page=6');
			const responseData = response.data.data;
			setpopularPizzas(responseData);
			setLoading(false);
		} catch (error) {
			setError('Hiba történt a lekérdezésben');
		} finally {
			setLoading(false);
		}
	};

	return (
		<PizzasContext.Provider
			value={{ popularPizzas, loading, error, success, setSuccessMessage, fetchPizzas }}
		>
			{children}
		</PizzasContext.Provider>
	);
}

export default PizzasProvider;
