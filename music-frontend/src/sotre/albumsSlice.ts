import {createSlice} from '@reduxjs/toolkit';
import {AlbumsArtist} from '../types';
import {fetchAlbums} from './albumsThunks';

export interface AlbumsState {
  fetchAlbumsLoading: boolean;
  albums: AlbumsArtist | null;
}

const initialState: AlbumsState = {
  fetchAlbumsLoading: false,
  albums: null,
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
  },
  selectors: {
    selectorFetchAlbumsLoading: (state: AlbumsState) => state.fetchAlbumsLoading,
    selectorAlbums: (state: AlbumsState) => state.albums,
  }
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectorFetchAlbumsLoading,
  selectorAlbums,
} = albumsSlice.selectors;