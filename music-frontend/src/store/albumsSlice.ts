import {createSlice} from '@reduxjs/toolkit';
import {AlbumsArtist, AlbumWithTracks} from '../types';
import {fetchAlbums, fetchOneAlbum} from './albumsThunks';

export interface AlbumsState {
  fetchAlbumsLoading: boolean;
  fetchOneAlbum: boolean;
  albums: AlbumsArtist | null;
  album: AlbumWithTracks | null;
}

const initialState: AlbumsState = {
  fetchAlbumsLoading: false,
  fetchOneAlbum: false,
  albums: null,
  album: null,
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
  },
  selectors: {
    selectorFetchAlbumsLoading: (state: AlbumsState) => state.fetchAlbumsLoading,
    selectorAlbums: (state: AlbumsState) => state.albums,
    selectorFetchOneAlbum: (state: AlbumsState) => state.fetchOneAlbum,
    selectorAlbum: (state: AlbumsState) => state.album
  }
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectorFetchAlbumsLoading,
  selectorAlbums,
  selectorFetchOneAlbum,
  selectorAlbum,
} = albumsSlice.selectors;