import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './Auth.js'
import { expenseReducer } from './Expense.js';


const store = configureStore({
    reducer: {auth: authReducer, expense:expenseReducer}
});



export default store