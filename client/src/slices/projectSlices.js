import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchProjectById = createAsyncThunk('project/fetchProjectById', async (projectId, thunkApi) => {
	const response = await fetch(`http://localhost:4040/api/projects/${projectId}`);
	return await response.json();
});

const slice = createSlice({
	name: 'projects',
	initialState: {
		project: null
	},
	extraReducers: {
		[fetchProjectById.fulfilled]: (state, action) => {
			state.project = action.payload;
		}
	}
});

export default slice.reducer;
export { fetchProjectById };
