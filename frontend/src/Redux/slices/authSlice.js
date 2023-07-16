import {createSlice} from '@reduxjs/toolkit'

  const initialState = {
    //jwtToken: localStorage.getItem('jwtToken') || null
    isAuthenticated: false
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        //state.jwtToken = action.payload;
        state.isAuthenticated = action.payload
      },
      logout: (state) => {
        //state.jwtToken = null;
        state.isAuthenticated = false;
      },
    },
  });
  
  export const { loginSuccess, logout } = authSlice.actions;
  export default authSlice.reducer;