import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import { Account } from './Account';
import { Bookings } from './booking/Bookings';
import { Contact } from './Contact';
import { Family } from './Family';
import { Navbar } from './Navbar';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/boka" element={<Bookings />} />
				<Route path="/konto" element={<Account />} />
				<Route path="/familj" element={<Family />} />
				<Route path="/kontakt" element={<Contact />} />
				<Route path="*" element={<Bookings />} />
			</Routes>
		</div>
	);
}

export default App;
