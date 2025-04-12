import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lectureOperation: "Create",
  selectedLecture: null,
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setLectureOperation: (state, action) => {
      state.lectureOperation = action.payload;
    },
    clearLectureOperation: (state) => {
      state.lectureOperation = "";
    },
    setSelectedLecture: (state, action) => {
      state.selectedLecture = action.payload;
    },
    clearSelectedLecture: (state) => {
      state.selectedLecture = null;
    },
  },
});

export const {
  setLectureOperation,
  clearLectureOperation,
  setSelectedLecture,
  clearSelectedLecture,
} = lectureSlice.actions;

export default lectureSlice.reducer;
