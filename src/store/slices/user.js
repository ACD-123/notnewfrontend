import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
    },
  },
});
export default slice.reducer
const { loginSuccess, logoutSuccess } = slice.actions
export const login = ({ username, password }) => async dispatch => {
  try {
    dispatch(loginSuccess({username}));
  } catch (e) {
    return;
  }
}
export const logout = () => async dispatch => {
  try {
    return dispatch(logoutSuccess())
  } catch (e) {
    return;
  }
}