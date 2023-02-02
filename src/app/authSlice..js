import { createSlice } from "@reduxjs/toolkit";

function saveToLocalStorage({ name, email, password }) {
    let users = JSON.parse(localStorage.getItem('users')) ?? []
    let newUser = { name, email: email.toLocaleLowerCase(), password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
}

function validateUserFromLocalStorage({ email, password }) {
    let users = JSON.parse(localStorage.getItem('users'))
    let result = users.filter(user => user.email === email.toLocaleLowerCase())
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
            try {
                const { name, email, password } = action.payload
                state.name = name
                state.email = email
                state.password = password
                saveToLocalStorage({ name, email, password })
                state.message = "Signup successful! Proceed to login."
            } catch (error) {
                state.error = "Something broke! Failed to sign up."
                console.log(error)
            }
        },
        login(state, action) {
            try {
                if (state.user && state.password) return state.message = `Already logged in as ${state.name}`
                const { email, password } = action.payload
                let result = validateUserFromLocalStorage({ email, password })
                if (!result) return state.error = "User not found. Please signup."
                if (result.password === password) {
                    state.isLoggedIn = true
                    state.message = "Login successful."
                    state.email = result.email
                    state.name = result.name
                    return ;
                } else state.message = "Login Failed! Incorrect password."
            } catch (error) {
                state.error = "Something broke! Failed to login."
                console.log(error)
            }
        },
        logout(state) {
            state.isLoggedIn = false
            state.message = "You just logged out!"
            state.email = ''
            state.name = ''
        },
        updateMessage(state, action) {
            state.message = action.payload
        },
        updateError(state, action) {
            console.log('new error: ', action.payload)
            state.error = action.payload
        },
    }
})

export const { signUp, login, logout, updateMessage, updateError } = authSlice.actions

export default authSlice.reducer