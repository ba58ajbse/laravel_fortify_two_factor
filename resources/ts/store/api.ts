import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      query: () => '/api/user',
    }),
  }),
});

export const { useGetAuthUserQuery } = api;
