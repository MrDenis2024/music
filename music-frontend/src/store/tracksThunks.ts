import {createAsyncThunk} from '@reduxjs/toolkit';
import {TrackMutation} from '../types';
import axiosApi from '../axiosApi';

export const creatTrack = createAsyncThunk<void, TrackMutation>('tracks/create', async (trackMutation) => {
  await axiosApi.post('/tracks', trackMutation);
});