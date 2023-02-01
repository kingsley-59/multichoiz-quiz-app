import { createSlice } from "@reduxjs/toolkit";

function saveToLocalStorage({name, email, password}) {
    let users = JSON.parse(localStorage.getItem('users'))
    let newUser = {name, email, password}
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
}

function validateUserFromLocalStorage({email, password}) {
    let users = JSON.parse(localStorage.getItem('users'))
    let result = users.filter(user => user.email === email)
    if (result.length === 0) return false

    return result[0]
}

const initialState = {
    name: '',
    email: '',
    password: '',
    isLoggedIn: false,
    error: '',
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUp(state, action) {
            const { name, email, password } = action.payload
            state.name = name
            state.email = email
            state.password = password
            saveToLocalStorage({name, email, password})
        },
        login(state, action) {
            if(state.user && state.password) return state.message = `Already logged in as ${state.name}`
            const { email, password } = action.payload
            let result = validateUserFromLocalStorage({email, password})
            if (!result) return state.error = "User not found. Please signup."
            if (result.password === password) {
                state.isLoggedIn = false
                state.message = "Login successful."
                state.email = result.email
                state.name = result.name
            }
        },
        updateMessage(state, action) {
            state.message = action.payload
        },
        updateError(state, action) {
            state.error = action.payload
        }
    }
})

export const { signUp, login, updateMessage, updateError } = authSlice.actions

export default authSlice.reducer