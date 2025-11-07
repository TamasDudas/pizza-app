import { createBrowserRouter } from 'react-router-dom';
import Home from './src/pages/Home';
import Contact from './src/pages/Contact';
import Pizza from './src/pages/Pizza';
import NotFound from './src/pages/NotFound';
import MainLayout from './src/layouts/MainLayout';
import Pizzas from './src/pages/Pizzas';

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
				path: '/pizza/:id',
				element: <Pizza />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);
export default router;
