// Importing libraries
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Importing slices
import userSlice from "../redux/userSlice";

// Creating the filter (for redux persist)
const saveUserOnlyFilter = createFilter("user", ["user"]);

// Redux persist config
const persistConfig = {
	key: "user",
	storage,
	whitelist: ["user"],
	transforms: [saveUserOnlyFilter]
}

// Combining multiple reducers
const rootReducer = combineReducers({
	user: userSlice
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: true
});

export const persistor = persistStore(store);