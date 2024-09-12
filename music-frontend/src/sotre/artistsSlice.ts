import {createSlice} from '@reduxjs/toolkit';

export interface ArtistsState {
  fetchArtistsLoading: boolean;
}

const initialState: ArtistsState = {
  fetchArtistsLoading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  selectors: {
   selectorFetchArtistsLoading: (state: ArtistsState) => state.fetchArtistsLoading,
  },
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectorFetchArtistsLoading,
} = artistsSlice.selectors;