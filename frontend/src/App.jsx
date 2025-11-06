import { useState } from 'react';
import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="container mt-5">
			<h1 className="text-primary">Pizza REndelés</h1>
			<button className="btn btn-success">Rendelj most!</button>
		</div>
	);
}

export default App;
