import { configureStore, createSlice } from '@reduxjs/toolkit'

const authState = {isAuthenticated:false, openSignUp:false, backToLogin:false, forgetPass:false}

const authSlice = createSlice({
    name:'authentication',
    initialState:authState,
    reducers:{
        login(state){
            state.isAuthenticated = true
        },
        logOut(state){
            state.isAuthenticated = false
        },
        openSign(state){
            state.openSignUp = !state.openSignUp
        },
        openLogin(state){
            state.backToLogin = !state.backToLogin
        },
        openForgetPass(state){
            state.forgetPass = !state.forgetPass
        }

    }
})

const store = configureStore({
    reducer: {auth: authSlice.reducer}
});

export const authAction = authSlice.actions

export default store