import { createBrowserRouter } from 'react-router-dom';
import Home from './src/pages/Home';
import Contact from './src/pages/Contact';
import Pizza from './src/pages/Pizza';
import NotFound from './src/pages/NotFound';
import MainLayout from './src/layouts/MainLayout';
import Pizzas from './src/pages/Pizzas';
import Cart from './src/pages/Cart';
import Order from './src/pages/Order';
import TermsAndCondations from './src/pages/TermsAndCondations';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/kapcsolat',
				element: <Contact />,
			},

			{
				path: '/pizzak',
				element: <Pizzas />,
			},
			{
				path: '/kosar',
				element: <Cart />,
			},
			{
				path: '/pizzak/:id',
				element: <Pizza />,
			},
			{
				path: '/rendeles',
				element: <Order />,
			},
			{
				path: '/aszf',
				element: <TermsAndCondations />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);
export default router;
