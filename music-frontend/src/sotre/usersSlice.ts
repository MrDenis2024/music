import {User, ValidationError} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {register} from './usersThunks';

export interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state: UsersState) => {
      state.user = null;
      state.registerLoading = true;
      state.registerError = null;
    }).addCase(register.fulfilled, (state: UsersState, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    }).addCase(register.rejected, (state: UsersState, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
  },
  selectors: {
    selectUser: (state: UsersState) => state.user,
    selectRegisterLoading: (state: UsersState) => state.registerLoading,
    selectRegisterError: (state: UsersState) => state.registerError,
  },
});

export const usersReducer = usersSlice.reducer;
export const {
  selectUser,
  selectRegisterLoading,
  selectRegisterError,
} = usersSlice.selectors;