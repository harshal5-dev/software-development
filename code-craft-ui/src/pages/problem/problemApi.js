import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_CODE_CRAFT_API_URL;

export const problemApi = createApi({
  reducerPath: "problemApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Problem"],
  endpoints: (builder) => ({
    getProblem: builder.query({
      query: () => "/problem",
      providesTags: ["Problem"],
    }),
    getProblemMode: builder.query({
      query: () => "/problem-mode",
    }),
    getProblemType: builder.query({
      query: () => "problem-type",
    }),
    getProblemsByLectureId: builder.mutation({
      query: (data) => ({
        url: "/problem/by-lecture-id",
        method: "POST",
        body: data,
      }),
      providesTags: ["Problem"],
    }),
    createProblem: builder.mutation({
      query: (data) => ({
        url: "/problem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Problem"],
    }),
    updateProblem: builder.mutation({
      query: (data) => ({
        url: `/problem/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Problem"],
    }),
    deleteProblem: builder.mutation({
      query: (id) => ({
        url: `/problem/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Problem"],
    }),
  }),
});

export const {
  useGetProblemQuery,
  useGetProblemModeQuery,
  useGetProblemTypeQuery,
  useGetProblemsByLectureIdMutation,
  useCreateProblemMutation,
  useUpdateProblemMutation,
  useDeleteProblemMutation,
} = problemApi;
