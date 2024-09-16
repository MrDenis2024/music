import {createSlice} from '@reduxjs/toolkit';
import {addTrack} from './trackHistoriesThunks';

export interface TrackHistoriesState {
  loadingTrackHistory: false | string;
}

const initialState: TrackHistoriesState = {
  loadingTrackHistory: false,
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
  },
  selectors: {
    selectLoadingTrackHistory: (state: TrackHistoriesState) => state.loadingTrackHistory,
  },
});

export const trackHistoriesReducer = trackHistoriesSlice.reducer;
export const {
  selectLoadingTrackHistory,
} = trackHistoriesSlice.selectors;