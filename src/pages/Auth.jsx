import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, signUp, updateError } from '../app/authSlice.'
import './Auth.css'


export function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !name) return dispatch(updateError('Invalid inputs!'))
        if (password !== confirmPass) return dispatch(updateError('passwords do not match'))

        dispatch(signUp({ name, email, password }))
    }
    return (
        <div className='signup'>
            <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h3>Signup</h3>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input type="password" id="confirmPassword" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Login</button>
                        <p>Already have an account, <Link to={'/login'}>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}



export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) return dispatch(updateError('Invalid inputs!'))

        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (auth.isLoggedIn) navigate('/')
    }, [auth])
    return (
        <div className='login'>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Login</button>
                        <p>Don't have an account, <Link to={'/signup'}>Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
