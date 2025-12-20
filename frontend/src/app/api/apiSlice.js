import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//essentially what we would use axios for
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000'}), // base Url
    tagTypes: ['Note', 'User'], // these will be used for cached data
    endpoints: builder => ({})
})