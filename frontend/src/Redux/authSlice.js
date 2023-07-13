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
        localStorage.setItem('jwtToken', action.payload);
      },
      logout: (state) => {
        state.jwtToken = null;
        localStorage.removeItem('jwtToken');
      },
    },
  });
  
  export const { loginSuccess, logout } = authSlice.actions;
  export default authSlice.reducer;