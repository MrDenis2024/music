import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {Artist, ArtistMutation} from '../types';

export const fetchArtists = createAsyncThunk<Artist[], void>('artists/fetch', async () => {
  const {data: artists} = await axiosApi.get<Artist[]>('/artists');
  return artists;
});

export const createArtist = createAsyncThunk<void, ArtistMutation>('artists/create', async (artistMutation) => {
  const formData = new FormData();
  formData.append('name', artistMutation.name);
  if(artistMutation.image) {
    formData.append('image', artistMutation.image);
  }
  if(artistMutation.information) {
    formData.append('information', artistMutation.information);
  }

  await axiosApi.post('/artists', formData);
});