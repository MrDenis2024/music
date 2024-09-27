import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumMutation, AlbumsArtist, AlbumWithTracks} from '../types';
import axiosApi from '../axiosApi';

export const fetchAlbums = createAsyncThunk<AlbumsArtist, string>('albums/fetch', async (id) => {
  const {data: albums} = await axiosApi.get<AlbumsArtist>(`/albums?artist=${id}`);
  return albums;
});

export const fetchOneAlbum = createAsyncThunk<AlbumWithTracks, string>('albums/fetchOne', async (id) => {
  const {data: album} = await axiosApi.get<AlbumWithTracks>(`/albums/${id}`);
  return album;
});

export const createAlbum = createAsyncThunk<void, AlbumMutation>('albums/create', async (albumMutation,) => {
  const formData = new FormData();
  formData.append('artist', albumMutation.artist);
  formData.append('title', albumMutation.title);
  formData.append('year', albumMutation.year);
  if(albumMutation.image) {
    formData.append('image', albumMutation.image);
  }

  await axiosApi.post('/albums', formData);
});

export const changeAlbum = createAsyncThunk<void, string>('albums/change', async (id) => {
  await axiosApi.patch(`/albums/${id}/togglePublished`);
});