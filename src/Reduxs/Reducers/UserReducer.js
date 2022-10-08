import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: false,
  email: 'aa',
  password: 'pp',
};



const UserReducer=createSlice({
  name:"User",
  initialState,
  reducers:{
    ADD(state,action){
      state.data=action.payload
    },
    REMOVE(state,action){
      state.data=action.payload
    }
  }
})

export const {ADD,REMOVE}=UserReducer.actions
export default UserReducer.reducer

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