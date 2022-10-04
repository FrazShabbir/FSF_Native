import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {storeData, removeData} from '../../utils/storage';
import {loginUserThunk, clearStoreThunk} from './UserThunk';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  isSplash: true,
  isWelcome: true,
  isIntroRequired: false,
  user: {
    number: '',
    email: '',
    otp: '',
  },
  token: {},
};

// Chage routes based on Back end Api
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    storeData('@RefAuth', {...user});
    return loginUserThunk('/login', user, thunkAPI);
  },
);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearIntro: (state) => {
      state.isIntroRequired = false;
    },
    clearState: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isFailed = false;
      state.isWelcome = true;
      return state;
    },
    clearSplash: (state, {payload}) => {
      if (payload != null && payload != undefined) {
        state.user = payload;
      }
      state.isSplash = false;
      return state;
    },
    logoutUser: (state, {payload}) => {
      state.user = payload;
      state.token = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.isWelcome = true;
      removeData('@RefAuth');
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFailed = false;
      state.token = {};
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      const user = payload;
      state.token = user;
      storeData('@RefAuth', user);
      state.isLoading = false;
      if (user !== null && user.result === 'Y') {
        state.isSuccess = true;
      } else {
        state.isFailed = true;
      }
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.token = {};
    },
  },
});

export const {clearState, logoutUser, clearSplash, clearIntro} = userSlice.actions;

export default userSlice.reducer;
