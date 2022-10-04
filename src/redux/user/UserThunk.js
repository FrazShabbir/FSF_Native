import customFetch from '../../utils/axios';
import { logoutUser } from './UserSlice';

export const loginUserThunk = async (url, req, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, req);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};