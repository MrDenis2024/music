import {createSlice} from '@reduxjs/toolkit';

export interface TracksState {
  fetchTracksLoading: boolean;
}

const initialState: TracksState = {
  fetchTracksLoading: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  selectors: {
    selectorFetchTracksLoading: (state: TracksState) => state.fetchTracksLoading,
  }
});

export const tracksReduce = tracksSlice.reducer;
export const {
  selectorFetchTracksLoading,
} = tracksSlice.selectors;