import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_CODE_CRAFT_API_URL;

export const problemSolutionApi = createApi({
  reducerPath: "problemSolutionApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["ProblemSolution"],
  endpoints: (builder) => ({
    getProblemSolution: builder.query({
      query: () => "/problem-solution",
      providesTags: ["ProblemSolution"],
    }),
    getProblemSolutionByProblemId: builder.mutation({
      query: (data) => ({
        url: "/problem-solution/by-problem-id",
        method: "POST",
        body: data,
      }),
      providesTags: ["ProblemSolution"],
    }),
    createProblemSolution: builder.mutation({
      query: (data) => ({
        url: "/problem-solution",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProblemSolution"],
    }),
    updateProblemSolution: builder.mutation({
      query: (data) => ({
        url: `/problem-solution/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProblemSolution"],
    }),
    deleteProblemSolution: builder.mutation({
      query: (id) => ({
        url: `/problem-solution/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProblemSolution"],
    }),
  }),
});

export const {
  useGetProblemSolutionQuery,
  useGetProblemSolutionByProblemIdMutation,
  useCreateProblemSolutionMutation,
  useUpdateProblemSolutionMutation,
  useDeleteProblemSolutionMutation,
} = problemSolutionApi;
