import { configureStore } from '@reduxjs/toolkit';
import pathReducer from './path';

const store = configureStore({
    reducer: {
        path: pathReducer
    }
})

export default store;