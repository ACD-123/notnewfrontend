import { createSlice } from '@reduxjs/toolkit'
const initialUser = localStorage.getItem('cupon')
    ? JSON.parse(localStorage.getItem('cupon'))
    : null
// Slice
const slice = createSlice({
  name: 'cupon',
  initialState: {
    // user: null,
    cupon: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.cupon = action.payload;
      localStorage.setItem('cupon', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) =>  {
      state.cupon = null;
      localStorage.removeItem('cupon')
    },
  },
});
export default slice.reducer
// Actions
const { loginSuccess, logoutSuccess } = slice.actions
export const saveCupon = ( cupon ) => async dispatch => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess(cupon));
  } catch (e) {
    return 
  }
}
export const deleteCupon = () => async dispatch => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return;
  }
}