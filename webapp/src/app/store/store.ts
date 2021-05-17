import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accessReducer from '../../features/access/services/accessSlice';

export const store = configureStore({
  reducer: {
    access: accessReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
