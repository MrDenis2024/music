import {createSlice} from '@reduxjs/toolkit';
import {changeArtist, createArtist, deleteArtist, fetchArtists} from './artistsThunks';
import {Artist} from '../types';

export interface ArtistsState {
  fetchArtistsLoading: boolean;
  artists: Artist[];
  createArtistLoading: boolean;
  changeLoadingArtist: false | string;
  deleteLoadingArtist: false | string;
}

const initialState: ArtistsState = {
  fetchArtistsLoading: false,
  artists: [],
  createArtistLoading: false,
  changeLoadingArtist: false,
  deleteLoadingArtist: false,
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

    builder.addCase(changeArtist.pending, (state: ArtistsState, {meta: {arg: artist}}) => {
      state.changeLoadingArtist = artist;
    }).addCase(changeArtist.fulfilled, (state: ArtistsState) => {
      state.changeLoadingArtist = false;
    }).addCase(changeArtist.rejected, (state: ArtistsState) => {
      state.changeLoadingArtist = false;
    });

    builder.addCase(deleteArtist.pending, (state: ArtistsState, {meta: {arg: artist}}) => {
      state.deleteLoadingArtist = artist;
    }).addCase(deleteArtist.fulfilled, (state: ArtistsState) => {
      state.deleteLoadingArtist = false;
    }).addCase(deleteArtist.rejected, (state: ArtistsState) => {
      state.deleteLoadingArtist = false;
    });
  },
  selectors: {
    selectorFetchArtistsLoading: (state: ArtistsState) => state.fetchArtistsLoading,
    selectorArtists: (state: ArtistsState) => state.artists,
    selectorCreateArtistLoading: (state: ArtistsState) => state.createArtistLoading,
    selectorChangeLoadingArtist: (state: ArtistsState) => state.changeLoadingArtist,
    selectorDeleteLoadingArtist: (state: ArtistsState) => state.deleteLoadingArtist,
  },
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectorFetchArtistsLoading,
  selectorArtists,
  selectorCreateArtistLoading,
  selectorChangeLoadingArtist,
  selectorDeleteLoadingArtist,
} = artistsSlice.selectors;