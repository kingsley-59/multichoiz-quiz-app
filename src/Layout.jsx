import './Layout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuiz } from './app/todoSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { logout, updateError, updateMessage } from './app/authSlice.'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  const exitQuiz = () => {
    dispatch(resetQuiz())
    navigate('/')
  }

  useEffect(() => {
    console.log('change detected')
    if (auth.message) {
      toast(auth.message)
      setTimeout(() => dispatch(updateMessage('')), 2000)
    }

    if (auth.error) {
      toast.error(auth.error)
      setTimeout(() => dispatch(updateError('')), 2000)
    }
  }, [auth])

  useEffect(() => {
    if (!auth.isLoggedIn) navigate('/')
  }, [auth.isLoggedIn])
  
  return (
    <div className='root'>
      <header>
        <div className='header-container'>
          <div className='title' onClick={() => navigate('/')} style={{cursor: 'pointer'}}>MultiChoiz Quiz App</div>
          <div className="exit">
            {auth.isLoggedIn ? (
              <button className='exit-button' onClick={exitQuiz}>
                Exit quiz
              </button>
            ) : (
              <div className="auth-buttons">
                <button className='auth-button' onClick={() => navigate('/signup')}>
                  Signup
                </button>
                <button className='auth-button' onClick={() => navigate('/login')}>
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <Outlet />
      <ToastContainer />

      <footer>
        Copyright &copy; 2023 |
        <span style={{
          color: 'crimson',
          cursor: 'pointer',
          padding: '0 5px',
        }} onClick={() => dispatch(logout())}> Logout</span>
      </footer>
    </div>
  )
}
