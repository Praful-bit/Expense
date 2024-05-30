import { createSlice } from "@reduxjs/toolkit"

const authState = {
    token:localStorage.getItem("token")  || null,
    isAuthenticated: !!localStorage.getItem('token'),
    openSignUp: false,
    backToLogin: false,
    forgetPass: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: authState,
    reducers: {
        login(state,action) {
            state.token = action.payload
            state.isAuthenticated = true;
            localStorage.setItem("token",action.payload)
        },
        logOut(state) {
            state.token = null
            state.isAuthenticated = false;
            localStorage.removeItem("token")
        },
        openSign(state) {
            state.openSignUp = !state.openSignUp;
        },
        openLogin(state) {
            state.backToLogin = !state.backToLogin;
        },
        openForgetPass(state) {
            state.forgetPass = !state.forgetPass;
        }
    }
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;  
