import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { moduleApi } from "@/pages/module/moduleApi.js";
import { lectureApi } from "@/pages/lecture/lectureApi.js";
import { problemApi } from "@/pages/problem/problemApi.js";
import { problemSolutionApi } from "@/pages/problemSolution/problemSolutionApi.js";
import lectureReducer from "@/pages/lecture/lectureSlice.js";
import problemReducer from "@/pages/problem/problemSlice.js";
import problemSolutionReducer from "@/pages/problemSolution/problemSolutionSlice.js";
import solutionViewerReducer from "@/pages/solutionViewer/solutionViewerSlice.js";

export const store = configureStore({
  reducer: {
    [moduleApi.reducerPath]: moduleApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [problemApi.reducerPath]: problemApi.reducer,
    [problemSolutionApi.reducerPath]: problemSolutionApi.reducer,
    lecture: lectureReducer,
    problem: problemReducer,
    problemSolution: problemSolutionReducer,
    solutionViewer: solutionViewerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      moduleApi.middleware,
      lectureApi.middleware,
      problemApi.middleware,
      problemSolutionApi.middleware
    ),
});

setupListeners(store.dispatch);
