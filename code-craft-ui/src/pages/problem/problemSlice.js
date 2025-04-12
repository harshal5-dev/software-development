import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  problemOperation: "Create",
  selectedProblem: null,
}

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setProblemOperation: (state, action) => {
      state.problemOperation = action.payload;
    },
    clearProblemOperation: (state) => {
      state.problemOperation = "";
    },
    setSelectedProblem: (state, action) => {
      state.selectedProblem = action.payload;
    },
    clearSelectedProblem: (state) => {
      state.selectedProblem = null;
    },
  },
});

export const {
  setProblemOperation,
  clearProblemOperation,
  setSelectedProblem,
  clearSelectedProblem
} = problemSlice.actions;

export default problemSlice.reducer;