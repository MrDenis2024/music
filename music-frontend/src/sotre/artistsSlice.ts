import {createSlice} from '@reduxjs/toolkit';
import {fetchArtists} from './artistsThunks';
import {Artist} from '../types';

export interface ArtistsState {
  fetchArtistsLoading: boolean;
  artists: Artist[];
}

const initialState: ArtistsState = {
  fetchArtistsLoading: false,
  artists: [],
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state: ArtistsState) => {
      state.fetchArtistsLoading = true;
    }).addCase(fetchArtists.fulfilled, (state: ArtistsState, {payload: artist}) => {
      state.fetchArtistsLoading = false;
      state.artists = artist;
    }).addCase(fetchArtists.rejected, (state: ArtistsState) => {
      state.fetchArtistsLoading = false;
    });
  },
  selectors: {
    selectorFetchArtistsLoading: (state: ArtistsState) => state.fetchArtistsLoading,
    selectorArtists: (state: ArtistsState) => state.artists,
  },
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectorFetchArtistsLoading,
  selectorArtists,
} = artistsSlice.selectors;