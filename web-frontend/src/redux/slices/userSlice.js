// Importing libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Importing axios
import api from "../services/api";

const initialState = {
	status: "",
	error: "",
	isAuthenticated : false,
	user: {
		id: "",
		name: "",
		email: "",
		picture: "",
		access_token: "",
		refresh_token: "",
		todos: []
	},
}

export const loginUser = createAsyncThunk('auth/register', async (values, { rejectWithValue }) => {
	try {
		const { data } = await api.post("/auth/login", {
			...values
		});
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response.data.error.message);
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.status = "";
			state.error = "";
			state.isAuthenticated = false;
			state.user = {
				id: "",
				name: "",
				email: "",
				picture: "",
				access_token: "",
				refresh_token: "",
				todos: []
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state, action) => {
			state.status = "loading";
		})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.isAuthenticated = true;
				state.user = action.payload.data;
				state.error = "";
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
				state.isAuthenticated = false;
			})
	}
})


export const { logout } = userSlice.actions;
export default userSlice.reducer;