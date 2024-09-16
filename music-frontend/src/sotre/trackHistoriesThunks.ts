import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';
import {HistoryTrack} from '../types';

export const addTrack =  createAsyncThunk<void, HistoryTrack, {state: RootState}>('trackHistories/add', async (track, {getState}) => {
  await axiosApi.post('/track_history', track, {headers: {'Authorization': `Bearer ${getState().users.user?.token}`}});
});