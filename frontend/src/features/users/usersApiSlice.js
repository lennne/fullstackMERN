import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({})
/** 
 * Dealing with Arrays [user1, user2] is slow if you need to find one specific user
 * (you have to loop through them all). Dealing with Objects { 1: user1, 2: user2 }
 * is instant. This adapter prepares that structure for us. 
 * */

const initialState = usersAdapter.getInitialState()


/** 
 * using the Code Splitting pattern. Instead of writing every single API call for your entire application inside
 * one massive apiSlice.js file (which would get messy fast), you are keeping apiSlice.js empty and "injecting"
 * the user-related logic from this separate file.
 * ---------
 * The Hub (apiSlice.js): This is the main "Brain." It knows how to connect (the base URL) and how 
 * to cache, but it starts with no actual instructions on what to fetch.
 * 
 * The Plugin (usersApiSlice.js): This file says, "Hey Main Brain, I have some new instructions for you.
 * Here is how you fetch Users. Add this to your list."
 * --------
 * Why do it this way?
 * Organization: You can keep User logic in features/users, Note logic in features/notes, etc.
 * Maintainability: If you need to fix a bug with Users, you know exactly which file to open.
*/

export const usersApiSlice = apiSlice.injectEndpoints({ 
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
       /**  
             * `validateStatus` inside the fetchBaseQuery (or a specific endpoint's query configuration) 
             * allows us to customize how Redux Toolkit Query (RTK Query) handles HTTP responses.
             * * By default, fetch and RTK Query only treat 2xx status codes (like 200 OK) as successful. 
             * Everything else is treated as an error.
             * 
             * The point of this configuration is:
             * Handling Custom Error Flags: The backend middleware is set up to return a JSON object
             * that includes an isError: true property, even if the HTTP status code might technically be 200 (or if they want to catch 200 responses that are logically errors).
             * Strict Success Checking: It forces RTK Query to only consider a request "fulfilled" (successful) if:
             * The HTTP status is strictly 200.
             * AND the JSON body returned from the server does not have the isError property set to true.
        */

        validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
        },
        keepUnusedDataFor: 5,
        transformResponse: responseData => {
            const loadedUsers = responseData.map(user => {
                user.id = user._id
                return user
            });
            /** 
             * this tool is used to normalize your data. Instead of storing users as an Array [{}, {}, {}], 
             * it turns them into an Object
             * ```javascript 
             * ids: [1, 2]
             * ```
             * , entities: { 1: {}, 2: {} }. 
             * This makes finding a specific user by ID instant (like a hash map) rather than having to loop 
             * through an array. 
             */
            return usersAdapter.setAll(initialState, loadedUsers)
        },
        providedTags: (result, error, arg) => {
            if (result?.ids){
                return [
                    { type: 'User', id: 'LIST' },
                    ...result.ids.map(id => ({type: 'User', id}))
                ]
            } else return [{ type: 'User', id: 'LIST' }]
        }
    })
})
})

export const {
    useGetUsersQuery,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

/** 
 * creates memoized selector - memoized is used because when react rerenders the page, the same variable is not
 * regarded as already created, javascript creates the previous variable as if it was new and react in turn thinks 
 * the variable needs to be initialized and stored once again making a variable we don't want to rerender to rerender
 * and take up space all over again
*/
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

/**
 * getSelectors creates these selectors and we rename them with aliases 'selectAll' using destructuring
 * destructuring as you know is 
 * ```
 * const { hello, world} = { 
 * hello: () => console.log("i'm an arrow function")
 * world: "I'm a string"
 * }
 * ```
 */
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state

} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState )
/** 
 * over here we use the null coleskine operator '??' which if that's null then it just goes to initial state
 * but otherwise these are memoized selectors and they come in handy when we want to optimize our application
*/ 