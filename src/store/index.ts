import { configureStore } from '@reduxjs/toolkit';
import pathReducer from './path';
import gameSettingsReducer from './game-settings';

const store = configureStore({
    reducer: {
        path: pathReducer,
        game: gameSettingsReducer
    }
})

export default store;