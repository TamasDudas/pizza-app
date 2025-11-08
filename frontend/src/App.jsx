import { RouterProvider } from 'react-router-dom';
import router from '../Router.jsx';
import PizzasProvider from './context/PizzasContext.jsx';
import PizzaProvider from './context/PizzaContext.jsx';
import CartProvider from './context/CartContext.jsx';

function App() {
	return (
		<>
			<div>
				<PizzasProvider>
					<PizzaProvider>
						<CartProvider>
							<RouterProvider router={router} />
						</CartProvider>
					</PizzaProvider>
				</PizzasProvider>
			</div>
		</>
	);
}

export default App;
