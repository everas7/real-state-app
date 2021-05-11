import { Access } from './accessApi';
import { history } from '../../../index';
import { LoginForm } from '../models/login';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../store/store';
import { SignupForm } from '../models/signup';

export interface AccessState {
  isAuthenticated: boolean;
}

const initialState: AccessState = {
  isAuthenticated: false,
};

export const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = accessSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.access.isAuthenticated;

export const login = (loginForm: LoginForm): AppThunk => (
  dispatch,
  getState
) => {
  Access.login(loginForm).then((res) => {
    if (res.accessToken) {
      localStorage.setItem('jwt', res.accessToken);
      dispatch(setAuthenticated(true));
      history.push('/');
    }
  });
};


export default accessSlice.reducer;