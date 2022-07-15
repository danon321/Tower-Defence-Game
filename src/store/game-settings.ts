import { createSlice } from '@reduxjs/toolkit';

const gameInitState = { isGameStarted: false }

const gameSettingsSlice = createSlice({
    name: 'game',
    initialState: gameInitState,
    reducers: {
        startGame(state: { isGameStarted: boolean }) {
            state.isGameStarted = true;
        }
    }
});

export const gameSettingsActions = gameSettingsSlice.actions;
export default gameSettingsSlice.reducer;