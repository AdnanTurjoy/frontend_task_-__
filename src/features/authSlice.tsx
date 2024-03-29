import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            
            const { id, token } = action.payload
            state.user = id
            state.token = token
        },
        logOut: (state, _action) => {
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: { auth: { user: any } }) => state.auth.user
export const selectCurrentToken = (state: { auth: { token: any } }) => state.auth.token