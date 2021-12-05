import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import { Bookings } from './booking/Bookings';
import { Navbar } from './Navbar';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/boka" element={<Bookings />} />
				<Route path="/konto" element={<Bookings />} />
				<Route path="/familj" element={<Bookings />} />
				<Route path="/kontakt" element={<Bookings />} />
			</Routes>
		</div>
	);
}

export default App;
