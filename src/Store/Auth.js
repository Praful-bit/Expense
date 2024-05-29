import { createSlice } from "@reduxjs/toolkit"

const authState = {
    isAuthenticated: false,
    openSignUp: false,
    backToLogin: false,
    forgetPass: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: authState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logOut(state) {
            state.isAuthenticated = false;
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
