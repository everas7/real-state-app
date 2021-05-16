import { Access } from './accessApi';
import { Users } from '../../../app/services/usersApi';
import { history } from '../../../index';
import { LoginForm } from '../../../app/models/login';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store/store';
import { User } from '../../../app/models/user';

export interface AccessState {
  isAuthenticated: boolean;
  authenticationError: boolean;
  authenticatedUser: User | null;
}

const initialState: AccessState = {
  isAuthenticated: false,
  authenticationError: false,
  authenticatedUser: null,
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
    setAuthenticatedUser: (state, action: PayloadAction<User | null>) => {
      state.authenticatedUser = action.payload;
    },
  },
});

export const {
  setAuthenticated,
  setAuthenticationError,
  setAuthenticatedUser,
} = accessSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.access.isAuthenticated;

export const selectAuthenticationError = (state: RootState) =>
  state.access.authenticationError;

export const selectAuthenticatedUser = (state: RootState) =>
  state.access.authenticatedUser;

export const login =
  (loginForm: LoginForm): AppThunk =>
  (dispatch, getState) => {
    Access.login(loginForm)
      .then((res) => {
        if (res.accessToken) {
          localStorage.setItem('jwt', res.accessToken);
          dispatch(setCurrentUser());
          history.push('/');
        }
      })
      .catch(() => {
        dispatch(setAuthenticationError(true));
      });
  };

export const setCurrentUser = (): AppThunk => async (dispatch, getState) => {
  const user = await Users.me();
  dispatch(setAuthenticatedUser(user));
  dispatch(setAuthenticated(true));
};

export const logout = (): AppThunk => (dispatch, getState) => {
  localStorage.removeItem('jwt');
  dispatch(setAuthenticatedUser(null));
  dispatch(setAuthenticationError(false));
  dispatch(setAuthenticated(false));
};

export default accessSlice.reducer;
