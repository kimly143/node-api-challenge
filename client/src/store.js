import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import projectsReducer from './slices/projectSlices';

const store = configureStore({
    devTools: true,
	reducer: combineReducers({
		projects: projectsReducer
	})
});

export default store;
