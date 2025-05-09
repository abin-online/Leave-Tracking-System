import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",  
    storage,      
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
