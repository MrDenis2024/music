import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsArtist, AlbumWithTracks} from '../types';
import axiosApi from '../axiosApi';

export const fetchAlbums = createAsyncThunk<AlbumsArtist, string>('albums/fetch', async (id) => {
  const {data: albums} = await axiosApi.get<AlbumsArtist>(`/albums?artist=${id}`);
  return albums;
});

export const fetchOneAlbum = createAsyncThunk<AlbumWithTracks, string>('albums/fetchOne', async (id) => {
  const {data: album} = await axiosApi.get<AlbumWithTracks>(`/albums/${id}`);
  return album;
});