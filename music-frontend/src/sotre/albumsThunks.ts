import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsArtist} from '../types';
import axiosApi from '../axiosApi';

export const fetchAlbums = createAsyncThunk<AlbumsArtist, string>('albums/fetch', async (id) => {
  const {data: albums} = await axiosApi.get<AlbumsArtist>(`/albums?artist=${id}`);
  return albums;
});