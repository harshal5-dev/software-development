import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  problemSolutionOperation: "Create",
  selectedProblemSolution: null,
};

const problemSolutionSlice = createSlice({
  name: "problemSolution",
  initialState,
  reducers: {
    setProblemSolutionOperation: (state, action) => {
      state.problemSolutionOperation = action.payload;
    },
    setSelectedProblemSolution: (state, action) => {
      state.selectedProblemSolution = action.payload;
    },
    clearProblemSolutionOperation: (state) => {
      state.problemSolutionOperation = "";
    },
    clearSelectedProblemSolution: (state) => {
      state.selectedProblemSolution = null;
    },
  },
});

export const {
  setProblemSolutionOperation,
  setSelectedProblemSolution,
  clearProblemSolutionOperation,
  clearSelectedProblemSolution,
} = problemSolutionSlice.actions;

export default problemSolutionSlice.reducer;
