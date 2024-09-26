import {createSlice} from '@reduxjs/toolkit';
import {createArtist, fetchArtists} from './artistsThunks';
import {Artist} from '../types';

export interface ArtistsState {
  fetchArtistsLoading: boolean;
  artists: Artist[];
  createArtistLoading: boolean;
}

const initialState: ArtistsState = {
  fetchArtistsLoading: false,
  artists: [],
  createArtistLoading: false,
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

    builder.addCase(createArtist.pending, (state: ArtistsState) => {
      state.createArtistLoading = true;
    }).addCase(createArtist.fulfilled, (state: ArtistsState) => {
      state.createArtistLoading = false;
    }).addCase(createArtist.rejected, (state: ArtistsState) => {
      state.createArtistLoading = false;
    });
  },
  selectors: {
    selectorFetchArtistsLoading: (state: ArtistsState) => state.fetchArtistsLoading,
    selectorArtists: (state: ArtistsState) => state.artists,
    selectorCreateArtistLoading: (state: ArtistsState) => state.createArtistLoading,
  },
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectorFetchArtistsLoading,
  selectorArtists,
  selectorCreateArtistLoading,
} = artistsSlice.selectors;