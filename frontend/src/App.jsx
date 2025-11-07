import { RouterProvider } from 'react-router-dom';
import router from '../Router.jsx';
import PizzasProvider from './context/PizzasContext.jsx';
import PizzaProvider from './context/PizzaContext.jsx';

function App() {
	return (
		<>
			<div>
				<PizzasProvider>
					<PizzaProvider>
						<RouterProvider router={router} />
					</PizzaProvider>
				</PizzasProvider>
			</div>
		</>
	);
}

export default App;
