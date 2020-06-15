import React, { useEffect } from 'react';
import './App.css';

import { useDispatch } from 'react-redux';
import { fetchProjectById } from './slices/projectSlices';
import Project from "./components/Project"

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProjectById(1));
	}, []);
	return (
			<div className="App">
        <Project/>
			</div>
	);
}

export default App;
