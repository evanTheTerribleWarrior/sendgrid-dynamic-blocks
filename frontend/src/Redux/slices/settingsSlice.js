import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  segmentWebVitals: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSegmentWebVitals: (state, action) => {
      state.segmentWebVitals = action.payload;
    },
  },
});

export const { setSegmentWebVitals } = settingsSlice.actions;
export default settingsSlice.reducer;
