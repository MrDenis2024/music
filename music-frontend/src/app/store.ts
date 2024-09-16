import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../sotre/artistsSlice';
import {albumsReducer} from '../sotre/albumsSlice';
import {usersReducer} from '../sotre/usersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import {trackHistoriesReducer} from '../sotre/trackHistoriesSlice';

const usersPersistConfig = {
  key: 'music:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  trackHistories: trackHistoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      }
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;