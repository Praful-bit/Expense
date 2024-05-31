import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './Auth.js'
import { expenseReducer } from './Expense.js';
import { themeReducer } from './Theme.js';


const store = configureStore({
    reducer: {auth: authReducer, expense:expenseReducer, theme:themeReducer}
});



export default store