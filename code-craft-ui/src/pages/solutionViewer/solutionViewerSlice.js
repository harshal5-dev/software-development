import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLectureId: null,
};

const solutionViewerSlice = createSlice({
  name: "solutionViewer",
  initialState,
  reducers: {
    setSelectedLectureIdToRedux: (state, action) => {
      state.selectedLectureId = action.payload;
    },
    clearSelectedLectureIdToRedux: (state) => {
      state.selectedLectureId = null;
    },
  },
});

export const { setSelectedLectureIdToRedux, clearSelectedLectureIdToRedux } =
  solutionViewerSlice.actions;

export default solutionViewerSlice.reducer;
