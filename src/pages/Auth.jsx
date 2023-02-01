import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateError } from '../app/authSlice.'
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

    }
    return (
        <div className='signup'>
            <div className="signup-container">
                <h3>Signup</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Passwork</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export function Login() {
  return (
    <div className='login'>
        <div className="login-container">
            This is for login
        </div>
    </div>
  )
}
