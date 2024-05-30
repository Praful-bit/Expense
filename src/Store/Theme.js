import {createSlice} from '@reduxjs/toolkit'
const themeState = {
    darkMode:false
}
const themeSlice = createSlice({
name:'theme',
initialState:themeState,
reducers:{
    toggleTheme(state){
        state.darkMode = !state.darkMode
    }
}
});

export const themeAction = themeSlice.actions;
export const themeReducer = themeSlice.reducer