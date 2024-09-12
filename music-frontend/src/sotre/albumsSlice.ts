import {createSlice} from '@reduxjs/toolkit';

export interface AlbumsState {
  fetchAlbumsLoading: boolean;
}

const initialState: AlbumsState = {
  fetchAlbumsLoading: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  selectors: {
    selectorFetchAlbumsLoading: (state: AlbumsState) => state.fetchAlbumsLoading,
  }
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectorFetchAlbumsLoading,
} = albumsSlice.selectors;