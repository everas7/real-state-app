import { Access } from './accessApi';
import { history } from '../../../index';
import { LoginForm } from '../../../app/models/login';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store/store';

export interface AccessState {
  isAuthenticated: boolean;
  authenticationError: boolean;
}

const initialState: AccessState = {
  isAuthenticated: false,
  authenticationError: false,
};

export const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAuthenticationError: (state, action: PayloadAction<boolean>) => {
      state.authenticationError = action.payload;
    },
  },
});

export const { setAuthenticated, setAuthenticationError } = accessSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.access.isAuthenticated;

export const selectAuthenticationError = (state: RootState) =>
  state.access.authenticationError;

export const login =
  (loginForm: LoginForm): AppThunk =>
  (dispatch, getState) => {
    Access.login(loginForm)
      .then((res) => {
        if (res.accessToken) {
          localStorage.setItem('jwt', res.accessToken);
          dispatch(setAuthenticated(true));
          dispatch(setAuthenticationError(false));
          history.push('/');
        }
      })
      .catch(() => {
        dispatch(setAuthenticationError(true));
      });
  };

export default accessSlice.reducer;
