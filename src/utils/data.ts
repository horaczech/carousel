import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const api = axios.create({baseURL: process.env.REACT_APP_API});

export const fetchStories = createAsyncThunk('stories/fetchStories', async (_, {rejectWithValue}) => {
    try {
        const res = await api.get('/stories');
        if (res.status === 200) {
            return res.data.data;
        }
        return null;
    } catch (e: any) {
        rejectWithValue(e.message);
    }
});

export const fetchCollections = createAsyncThunk('collections/fetchCollections', async (_, {rejectWithValue}) => {
    try {
        const res = await api.get('/collections');
        if (res.status === 200) {
            return res.data.data;
        }
        return null;
    } catch (e: any) {
        rejectWithValue(e.message);
    }
});
