import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import storiesReducer from './storiesSlice';
import collectionsReducer from './collectionsSlice';

export const store = configureStore({
    reducer: {
        stories: storiesReducer,
        collections: collectionsReducer
    }, // place for your reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware() // place for your middleware if you want
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
