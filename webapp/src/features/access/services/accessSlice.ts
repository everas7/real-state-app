import { Access } from './accessApi';
import { Users } from '../../../app/services/usersApi';
import { history } from '../../../index';
import { LoginForm } from '../../../app/models/login';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store/store';
import { User } from '../../../app/models/user';
import { resetPropertiesState } from '../../properties/services/propertiesSlice';

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
    setAuthenticated: (state, action: PayloadAction<User | null>) => {
      state.isAuthenticated = !!action.payload;
      state.authenticatedUser = action.payload;
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
  (loginForm: LoginForm, callback?: () => void): AppThunk =>
  (dispatch, getState) => {
    Access.login(loginForm)
      .then((res) => {
        localStorage.setItem('jwt', res.accessToken);
        dispatch(
          setCurrentUser(() => {
            if (callback) {
              callback();
            }

            history.push('/');
          })
        );
      })
      .catch(() => {
        dispatch(setAuthenticationError(true));
        if (callback) {
          callback();
        }
      });
  };

export const setCurrentUser =
  (cb?: () => void): AppThunk =>
  async (dispatch, getState) => {
    const user = await Users.me();
    dispatch(setAuthenticated(user));
    if (cb) {
      cb();
    }
  };

export const logout = (): AppThunk => (dispatch, getState) => {
  localStorage.removeItem('jwt');
  dispatch(setAuthenticationError(false));
  dispatch(setAuthenticated(null));
  dispatch(resetPropertiesState())
};

export default accessSlice.reducer;
