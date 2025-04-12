import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_CODE_CRAFT_API_URL;

export const moduleApi = createApi({
  reducerPath: "moduleApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getModule: builder.query({
      query: () => "/module",
      providesTags: ["Module"],
    }),
    getModuleInfo: builder.query({
      query: () => "/module/info",
      providesTags: ["Module"],
      transformResponse: (response) => {
        return response.map((module, index) => {
          return {
            id: module.id,
            title: module.moduleNumber,
            url: "#",
            isActive: index === 0,
            icon: true,
            items: module.lectures.map((lecture) => ({
              id: lecture.id,
              title: lecture.name,
              url: "/solution-viewer",
            })),
          };
        });
      },
    }),
    createModule: builder.mutation({
      query: (data) => ({
        url: "/module",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Module"],
    }),
    updateModule: builder.mutation({
      query: (data) => ({
        url: `/module/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Module"],
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Module"],
    }),
  }),
});

export const {
  useGetModuleQuery,
  useGetModuleInfoQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
