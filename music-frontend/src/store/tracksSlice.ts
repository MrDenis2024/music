import {createSlice} from '@reduxjs/toolkit';
import {creatTrack} from './tracksThunks';

export interface TracksState {
  createLoadingTrack: boolean;
}

const initialState: TracksState = {
  createLoadingTrack: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(creatTrack.pending, (state: TracksState) => {
      state.createLoadingTrack = true;
    }).addCase(creatTrack.fulfilled, (state: TracksState) => {
      state.createLoadingTrack = false;
    }).addCase(creatTrack.rejected, (state: TracksState) => {
      state.createLoadingTrack = false;
    });
  },
  selectors: {
    selectorCreateLoadingTracks: (state: TracksState) => state.createLoadingTrack,
  }
});

export const tracksReducer = tracksSlice.reducer;
export const {
  selectorCreateLoadingTracks,
} = tracksSlice.selectors;