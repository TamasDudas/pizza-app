import { createContext, useContext, useState } from 'react';
import api from '../api';

const PizzaContext = createContext({
	pizza: [],
	loading: false,
	error: null,
	fetchPizza: async () => {},
});

export const usePizzaContext = () => {
	const context = useContext(PizzaContext);
	if (!context) {
		throw new Error('Nincs Pizza context');
	}
	return context;
};

function PizzaProvider({ children }) {
	const [pizza, setPizza] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchPizza = async (id) => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get(`/pizzas/${id}`);
			const responseData = response.data;
			setPizza(responseData.data);
			setLoading(false);
		} catch (error) {
			setError('Hiba történt a lekérdezésben');
		} finally {
			setLoading(false);
		}
	};
	return (
		<PizzaContext.Provider value={{ pizza, loading, error, fetchPizza }}>
			{children}
		</PizzaContext.Provider>
	);
}

export default PizzaProvider;
