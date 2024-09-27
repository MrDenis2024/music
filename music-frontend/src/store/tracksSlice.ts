import {createSlice} from '@reduxjs/toolkit';
import {changeTrack, creatTrack} from './tracksThunks';

export interface TracksState {
  createLoadingTrack: boolean;
  loadingChangeTrack: false | string;
}

const initialState: TracksState = {
  createLoadingTrack: false,
  loadingChangeTrack: false,
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

    builder.addCase(changeTrack.pending, (state: TracksState, {meta: {arg: track}}) => {
      state.loadingChangeTrack = track;
    }).addCase(changeTrack.fulfilled, (state: TracksState) => {
      state.loadingChangeTrack = false;
    }).addCase(changeTrack.rejected, (state: TracksState) => {
      state.loadingChangeTrack = false;
    });
  },
  selectors: {
    selectorCreateLoadingTracks: (state: TracksState) => state.createLoadingTrack,
    selectorLoadingChangeTrack: (state: TracksState) => state.loadingChangeTrack,
  }
});

export const tracksReducer = tracksSlice.reducer;
export const {
  selectorCreateLoadingTracks,
  selectorLoadingChangeTrack,
} = tracksSlice.selectors;