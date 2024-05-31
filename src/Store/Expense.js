import { createSlice } from "@reduxjs/toolkit";

const expenseState = {
    data: [],
    toggle: false,
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: expenseState,
    reducers: {
        addExpense: (state, action) => {
            console.log(action.payload);
            state.data.push(action.payload)
        },
        getExpense: (state, action) => {
            state.data = [...action.payload]
        },
        deleteExpense: (state, action) => {
            state.data = state.data.filter((data) => data.id !== action.payload.id)
        },
        updateExpense: (state, action) => {
            state.data = state.data.map((data) => data.id === action.payload.id ? action.payload : data)
        },
        toggleExpense: (state) => { state.toggle = !state.toggle }
    }
})

export const expenseAction = expenseSlice.actions;
export const expenseReducer = expenseSlice.reducer;