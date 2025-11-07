import { RouterProvider } from 'react-router-dom';
import router from '../Router.jsx';
import PizzasProvider from './context/PizzasContext.jsx';

function App() {
	return (
		<>
			<div>
				<PizzasProvider>
					<RouterProvider router={router} />
				</PizzasProvider>
			</div>
		</>
	);
}

export default App;
