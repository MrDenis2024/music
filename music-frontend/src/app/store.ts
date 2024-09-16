import {configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../sotre/artistsSlice';
import {albumsReducer} from '../sotre/albumsSlice';
import {usersReducer} from '../sotre/usersSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;