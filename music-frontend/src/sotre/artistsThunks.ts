import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {Artist} from '../types';

export const fetchArtists = createAsyncThunk<Artist[], void>('artists/fetch', async () => {
  const {data: artists} = await axiosApi.get<Artist[]>('/artists');
  return artists;
});