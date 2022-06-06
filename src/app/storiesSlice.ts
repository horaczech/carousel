import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GlobalStateType, StoriesState} from '../ts/types';
import {fetchStories} from '../utils/data';

const initialState: GlobalStateType['stories'] = {
    allStories: null,
    storiesStatus: 'idle',
    error: null
};

export const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.pending, (state) => {
                state.storiesStatus = 'loading';
            })
            .addCase(fetchStories.fulfilled, (state, action: PayloadAction<StoriesState['allStories']>) => {
                state.storiesStatus = 'succeeded';
                state.allStories = action.payload;
            })
            .addCase(fetchStories.rejected, (state, action) => {
                state.storiesStatus = 'failed';
                state.error = action.error.message || 'Error';
            });
    }
});

const storiesReducer = storiesSlice.reducer;

export default storiesReducer;
