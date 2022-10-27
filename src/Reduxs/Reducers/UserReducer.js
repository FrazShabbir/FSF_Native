import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
  loginRequired: true,
  user:{}
};

const UserReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    Loggin(state, {payload}) {
      state.user = payload;
      state.loginRequired=false
    },
    Logout(state, {payload}) {
      state.user = payload;
      state.loginRequired=true
    },
  },
});

export const {Loggin,Logout} = UserReducer.actions;
export default UserReducer.reducer;

/* export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {...state, data: (state.data = action.payload)};
      break;
    case REMOVE:
      return {...state, data: state.data - 1};
      break;
    default:
      return state;
      break;
  }
  return state;
};
 */
