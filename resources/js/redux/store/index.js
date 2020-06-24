import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from "../reducers";
import storage from 'redux-persist/lib/storage';

const initialState = {};

const middleware = [thunk];

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: [
        'auth'
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer, // all combined reducers
    initialState, // DUHH initaial state at craete store level
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;
