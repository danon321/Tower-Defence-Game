import { createSlice } from '@reduxjs/toolkit';
import { PathCoordinates } from '../types/path';

const pathInitState = { pathPoints: [] }

const pathSlice = createSlice({
    name: 'path',
    initialState: pathInitState,
    reducers: {
        setPathPoint(state: { pathPoints: PathCoordinates[] }, action: any) {
            state.pathPoints.push(action.payload)
        }
    }
});

export const pathActions = pathSlice.actions;
export default pathSlice.reducer;