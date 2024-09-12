import {configureStore} from '@reduxjs/toolkit';
import {tracksReduce} from '../sotre/tracksSlice';
import {artistsReducer} from '../sotre/artistsSlice';
import {albumsReducer} from '../sotre/albumsSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;