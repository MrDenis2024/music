import {createSlice} from '@reduxjs/toolkit';
import { AlbumsArtist, AlbumWithTracks} from '../types';
import {changeAlbum, createAlbum, deleteAlbum, fetchAlbums, fetchOneAlbum} from './albumsThunks';

export interface AlbumsState {
  fetchAlbumsLoading: boolean;
  fetchOneAlbum: boolean;
  createAlbumLoading: boolean;
  albums: AlbumsArtist | null;
  album: AlbumWithTracks | null;
  changeAlbumLoading: false | string;
  deleteAlbumLoading: false | string;
}

const initialState: AlbumsState = {
  fetchAlbumsLoading: false,
  fetchOneAlbum: false,
  createAlbumLoading: false,
  albums: null,
  album: null,
  changeAlbumLoading: false,
  deleteAlbumLoading: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state: AlbumsState) => {
      state.fetchAlbumsLoading = true;
      state.albums = null;
    }).addCase(fetchAlbums.fulfilled, (state: AlbumsState, {payload: albums}) => {
      state.fetchAlbumsLoading = false;
      state.albums = albums;
    }).addCase(fetchAlbums.rejected, (state: AlbumsState) => {
      state.fetchAlbumsLoading = false;
    });

    builder.addCase(fetchOneAlbum.pending, (state: AlbumsState) => {
      state.album = null;
      state.fetchOneAlbum = true;
    }).addCase(fetchOneAlbum.fulfilled, (state:AlbumsState, {payload: album}) => {
      state.album = album;
      state.fetchOneAlbum = false;
    }).addCase(fetchOneAlbum.rejected, (state: AlbumsState) => {
      state.fetchOneAlbum = false;
    });

    builder.addCase(createAlbum.pending, (state: AlbumsState) => {
      state.createAlbumLoading = true;
    }).addCase(createAlbum.fulfilled, (state: AlbumsState) => {
      state.createAlbumLoading = false;
    }).addCase(createAlbum.rejected, (state: AlbumsState) => {
      state.createAlbumLoading = false;
    });

    builder.addCase(changeAlbum.pending, (state: AlbumsState, {meta: {arg: album}}) => {
      state.changeAlbumLoading = album;
    }).addCase(changeAlbum.fulfilled, (state: AlbumsState) => {
      state.changeAlbumLoading = false;
    }).addCase(changeAlbum.rejected, (state: AlbumsState) => {
      state.changeAlbumLoading = false;
    });

    builder.addCase(deleteAlbum.pending, (state: AlbumsState, {meta: {arg: album}}) => {
      state.deleteAlbumLoading = album;
    }).addCase(deleteAlbum.fulfilled, (state: AlbumsState) => {
      state.deleteAlbumLoading = false;
    }).addCase(deleteAlbum.rejected, (state: AlbumsState) => {
      state.deleteAlbumLoading = false;
    });
  },
  selectors: {
    selectorFetchAlbumsLoading: (state: AlbumsState) => state.fetchAlbumsLoading,
    selectorAlbums: (state: AlbumsState) => state.albums,
    selectorFetchOneAlbum: (state: AlbumsState) => state.fetchOneAlbum,
    selectorAlbum: (state: AlbumsState) => state.album,
    selectorCreateAlbumLoading: (state: AlbumsState) => state.createAlbumLoading,
    selectorChangeAlbumLoading: (state: AlbumsState) => state.changeAlbumLoading,
    selectorDeleteAlbumLoading: (state: AlbumsState) => state.deleteAlbumLoading,
  },
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectorFetchAlbumsLoading,
  selectorAlbums,
  selectorFetchOneAlbum,
  selectorAlbum,
  selectorCreateAlbumLoading,
  selectorChangeAlbumLoading,
  selectorDeleteAlbumLoading,
} = albumsSlice.selectors;