import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
  loginRequired: true,
  user: {},
  token: '',
  userId: '',
  Enrollstatus: "notRegister",
  notify: '',
  loading: '',
  NearOffice: [],
  allApplications: [],
  HomeStats: {
    id: '',
    regDate: '',
    expDate: '',
    name: '',
    status: '',
  },
  updateStatus: false,
  homeRefresh: false,
  initialModel: false,
};

const UserReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    SetinitialModel(state, {payload}) {
      state.initialModel = payload;
    },
    SetHomeRefresh(state, {payload}) {
      state.homeRefresh = payload;
    },
    Loggin(state, {payload}) {
      const {token, user, applications} = payload;
      const {id} = user;
      state.token = token;
      state.user = user;
      state.userId = id;
      state.initialModel = true;
      state.loginRequired = false;
      state.allApplications=applications;

      state.HomeStats.id = applications[0].application_id;
      state.HomeStats.name = applications[0].full_name;
      state.HomeStats.status = applications[0].status.toLowerCase();
      state.updateStatus = true;
      
    },
    GetProfile(state, {payload}) {
      state.user = payload;
    },
    UpdateProfile(state, {payload}) {
      state.user = payload;
    },
    Logout(state, {payload}) {
      (state.loginRequired = true), (state.user = {});
      state.token = '';
      state.userId = '';
      state.notify = '';
      state.loading = '';
      state.NearOffice = [];
      state.allApplications = [];
      state.HomeStats = {
        id: '',
        regDate: '',
        expDate: '',
        name: '',
        status: '',
      };
      state.updateStatus = false;
    },
    SetEnrollstatus(state, {payload}) {
      state.Enrollstatus = payload;
    },
    SetNotify(state, {payload}) {
      state.notify = payload;
    },
    SetNearOffice(state, {payload}) {
      state.NearOffice = payload;
    },
    SetLoading(state, {payload}) {
      state.loading = payload;
    },
    SetAllApplications(state, {payload}) {
      if (payload.length > 0 && state.updateStatus == false) {
        state.allApplications = payload;
        state.HomeStats.id = payload[0].application_id;
        state.HomeStats.regDate = payload[0].created_at.slice(0, 10);
        state.HomeStats.expDate = payload[0].renewal_date.slice(0, 10);
        state.HomeStats.name = payload[0].full_name;
        state.HomeStats.status = payload[0].status.toLowerCase();
        state.updateStatus = true;
        console.log('payload', payload);
      } else {
        state.allApplications = payload;
        //state.updateStatus = false;
      }
    },
    SetHomeStatus(state, {payload}) {
      state.HomeStats.regDate = payload.regDate;
      state.HomeStats.expDate = payload.expDate;
      state.HomeStats.name = payload.name;
      state.HomeStats.status = payload.status;
      state.HomeStats.id = payload.id;
    },
  },
});

export const {
  Loggin,
  SetAllApplications,
  Logout,
  UpdateProfile,
  hideBSheet,
  SetEnrollstatus,
  GetProfile,
  SetNotify,
  SetNearOffice,
  SetLoading,
  SetHomeStatus,
  SetinitialModel,
  SetHomeRefresh
} = UserReducer.actions;
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
