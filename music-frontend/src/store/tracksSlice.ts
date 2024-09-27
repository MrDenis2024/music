import {createSlice} from '@reduxjs/toolkit';
import {changeTrack, creatTrack, deleteTrack} from './tracksThunks';

export interface TracksState {
  createLoadingTrack: boolean;
  loadingChangeTrack: false | string;
  deleteTrackLoading: false | string;
}

const initialState: TracksState = {
  createLoadingTrack: false,
  loadingChangeTrack: false,
  deleteTrackLoading: false,
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

    builder.addCase(deleteTrack.pending, (state: TracksState, {meta: {arg: track}}) => {
      state.deleteTrackLoading = track;
    }).addCase(deleteTrack.fulfilled, (state: TracksState) => {
      state.deleteTrackLoading = false;
    }).addCase(deleteTrack.rejected, (state: TracksState) => {
      state.deleteTrackLoading = false;
    });
  },
  selectors: {
    selectorCreateLoadingTracks: (state: TracksState) => state.createLoadingTrack,
    selectorLoadingChangeTrack: (state: TracksState) => state.loadingChangeTrack,
    selectorDeleteTrackLoading: (state: TracksState) => state.deleteTrackLoading,
  }
});

export const tracksReducer = tracksSlice.reducer;
export const {
  selectorCreateLoadingTracks,
  selectorLoadingChangeTrack,
  selectorDeleteTrackLoading,
} = tracksSlice.selectors;