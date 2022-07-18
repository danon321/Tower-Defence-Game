import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from '../types/path';

const pathInitState = { pathPoints: [] }

const pathSlice = createSlice({
    name: 'path',
    initialState: pathInitState,
    reducers: {
        setPathPoint(state: { pathPoints: Coordinates[] }, action: PayloadAction<Coordinates>) {
            state.pathPoints.push(action.payload)
        }
    }
});

export const pathActions = pathSlice.actions;
export default pathSlice.reducer;