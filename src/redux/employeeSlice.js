import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = employeeSlice.actions;
export default employeeSlice.reducer;
