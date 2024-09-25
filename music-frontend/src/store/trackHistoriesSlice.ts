import {createSlice} from '@reduxjs/toolkit';
import {addTrack, fetchTracks} from './trackHistoriesThunks';
import {HistoryTracks} from '../types';

export interface TrackHistoriesState {
  loadingTrackHistory: false | string;
  fetchLoadingTrackHistory: boolean;
  trackHistories: HistoryTracks[];
}

const initialState: TrackHistoriesState = {
  loadingTrackHistory: false,
  fetchLoadingTrackHistory: false,
  trackHistories: [],
};

export const trackHistoriesSlice = createSlice({
  name: 'trackHistories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTrack.pending, (state: TrackHistoriesState, {meta: {arg: track}}) => {
      state.loadingTrackHistory = track.track;
    }).addCase(addTrack.fulfilled, (state: TrackHistoriesState) => {
      state.loadingTrackHistory = false;
    }).addCase(addTrack.rejected, (state: TrackHistoriesState) => {
      state.loadingTrackHistory = false;
    });

    builder.addCase(fetchTracks.pending, (state: TrackHistoriesState) => {
      state.fetchLoadingTrackHistory = true;
    }).addCase(fetchTracks.fulfilled, (state: TrackHistoriesState, {payload: tracks}) => {
      state.fetchLoadingTrackHistory = false;
      state.trackHistories = tracks;
    }).addCase(fetchTracks.rejected, (state: TrackHistoriesState) => {
      state.fetchLoadingTrackHistory = false;
    });
  },
  selectors: {
    selectLoadingTrackHistory: (state: TrackHistoriesState) => state.loadingTrackHistory,
    selectFetchLoadingTrackHistory: (state: TrackHistoriesState) => state.fetchLoadingTrackHistory,
    selectTrackHistories: (state: TrackHistoriesState) => state.trackHistories,
  },
});

export const trackHistoriesReducer = trackHistoriesSlice.reducer;
export const {
  selectLoadingTrackHistory,
  selectFetchLoadingTrackHistory,
  selectTrackHistories
} = trackHistoriesSlice.selectors;