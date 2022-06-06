import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CollectionsState, GlobalStateType} from '../ts/types';
import {fetchCollections} from '../utils/data';

const initialState: GlobalStateType['collections'] = {
    allCollections: null,
    collectionsStatus: 'idle',
    error: null
};

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.collectionsStatus = 'loading';
            })
            .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<CollectionsState['allCollections']>) => {
                state.collectionsStatus = 'succeeded';
                state.allCollections = action.payload;
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.collectionsStatus = 'failed';
                state.error = action.error.message || 'Error';
            });
    }
});

const collectionsReducer = collectionsSlice.reducer;

export default collectionsReducer;
