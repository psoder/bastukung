import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../styles/App.css';
import { Bookings } from './Bookings';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Bookings />
			</div>
		</BrowserRouter>
	);
}

export default App;
