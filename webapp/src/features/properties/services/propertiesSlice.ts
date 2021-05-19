import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Properties } from './propertiesApi';
import { RootState, AppThunk } from '../../../app/store/store';
import {
  IPropertyFilters,
  PropertyForList,
} from '../../../app/models/property';
import { formatQueryParams } from '../../../app/helpers/propertiesHelpers';

export interface PropertiesState {
  properties: PropertyForList[];
  page: number;
  totalPages: number;
  filters: IPropertyFilters;
  loadingList: boolean;
}
export const defaultFilters = {
  price: {
    min: 0,
    max: 20000,
  },
  floorAreaSize: {
    min: 0,
    max: 7000,
  },
  rooms: new Set<number>(),
};

const initialState: PropertiesState = {
  properties: [],
  page: 1,
  totalPages: 0,
  filters: defaultFilters,
  loadingList: false,
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<PropertyForList[]>) => {
      state.properties = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setFilters: (state, action: PayloadAction<IPropertyFilters>) => {
      state.filters = action.payload;
    },
    setLoadingList: (state, action: PayloadAction<boolean>) => {
      state.loadingList = action.payload;
    },
  },
});

export const {
  setProperties,
  setPage,
  setTotalPages,
  setFilters,
  setLoadingList,
} = propertiesSlice.actions;

export const selectProperties = (state: RootState) =>
  state.properties.properties;

export const selectPage = (state: RootState) => state.properties.page;

export const selectTotalPages = (state: RootState) =>
  state.properties.totalPages;

export const selectFilters = (state: RootState) => state.properties.filters;
export const selectLoadingList = (state: RootState) =>
  state.properties.loadingList;

export const fetchProperties = (): AppThunk => (dispatch, getState) => {
  const filters = getState().properties.filters;
  const page = getState().properties.page;
  const pageSize = 10;
  dispatch(setLoadingList(true));
  Properties.list(
    formatQueryParams(filters, defaultFilters, pageSize, page)
  ).then((res) => {
    dispatch(setProperties(res.data));
    dispatch(setTotalPages(res.pages));
    dispatch(setLoadingList(false));
  });
};

export const resetPropertiesState = (): AppThunk => (dispatch, getState) => {
  dispatch(setProperties([]));
  dispatch(setTotalPages(0));
  dispatch(setLoadingList(false));
  dispatch(setFilters(defaultFilters));
  dispatch(setPage(1));
};

export default propertiesSlice.reducer;
