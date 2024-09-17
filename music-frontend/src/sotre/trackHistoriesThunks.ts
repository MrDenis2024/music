import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';
import {HistoryTrack, HistoryTracks} from '../types';

export const addTrack =  createAsyncThunk<void, HistoryTrack, {state: RootState}>('trackHistories/add', async (track, {getState}) => {
  const token = getState().users.user?.token;
  await axiosApi.post('/track_history', track, {headers: {'Authorization': `Bearer ${token}`}});
});

export const fetchTracks = createAsyncThunk<HistoryTracks[], void, {state: RootState}>('trackHistories/get', async (_arg, {getState}) => {
  const token = getState().users.user?.token;
  const {data: tracks} = await axiosApi.get<HistoryTracks[]>('/track_history', {headers: {'Authorization' : `Bearer ${token}`}});
  return tracks;
});