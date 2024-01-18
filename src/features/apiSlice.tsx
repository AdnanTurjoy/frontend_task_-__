import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/" }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: 'api/users',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query({   
      query: (page = 1) => `api/users?page=${page}`,
    }),
    getUsersByPage: builder.mutation({
      query: (page) => ({
        url: `api/users?page=${page}`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    getSingleUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    editUser: builder.mutation({
      query: ({id,name,job}) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: {name,job},
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
        body: {},
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['User'],
    }),
    signInPost: builder.mutation({
      query: (payload) => ({
        url: 'api/login',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['User'],
    }),
    signUpPost: builder.mutation({
      query: (payload) => ({
        url: '/api/register',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});



export const { 
  useCreateUserMutation, 
  useDeleteUserMutation,
  useEditUserMutation, 
  useGetUsersQuery, 
  useGetUsersByPageMutation,
  useGetSingleUserMutation,
  useSignInPostMutation, 
  useSignUpPostMutation  
} = apiSlice;