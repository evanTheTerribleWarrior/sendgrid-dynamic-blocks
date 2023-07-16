import {createSlice} from '@reduxjs/toolkit'

  const initialState = {
    jwtToken: localStorage.getItem('jwtToken') || null
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        state.jwtToken = action.payload;
      },
      logout: (state) => {
        state.jwtToken = null;
      },
    },
  });
  
  export const { loginSuccess, logout } = authSlice.actions;
  export default authSlice.reducer;