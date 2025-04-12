import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_CODE_CRAFT_API_URL;

export const lectureApi = createApi({
  reducerPath: "lectureApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getLecture: builder.query({
      query: () => "/lecture",
      providesTags: ["Lecture"],
    }),
    getLectureByModuleId: builder.mutation({
      query: (data) => ({
        url: "/lecture/by-module-id",
        method: "POST",
        body: data,
      }),
      providesTags: ["Lecture"],
    }),
    getLectureById: builder.mutation({
      query: (data) => ({
        url: "/lecture/details",
        method: "POST",
        body: data,
      }),
      providesTags: ["Lecture"],
    }),
    createLecture: builder.mutation({
      query: (data) => ({
        url: "/lecture",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lecture"],
    }),
    updateLecture: builder.mutation({
      query: (data) => ({
        url: `/lecture/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lecture"],
    }),
    deleteLecture: builder.mutation({
      query: (id) => ({
        url: `/lecture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lecture"],
    }),
  }),
});

export const {
  useGetLectureQuery,
  useGetLectureByIdMutation,
  useGetLectureByModuleIdMutation,
  useCreateLectureMutation,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
} = lectureApi;
