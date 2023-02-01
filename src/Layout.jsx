import './Layout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuiz } from './app/todoSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  const exitQuiz = () => {
    dispatch(resetQuiz())
    navigate('/')
  }

  useEffect(() => {
    if (auth.message) toast(auth.message)
    if (auth.error) toast.error(auth.error)
  }, [auth?.message, auth?.error])
  
  return (
    <div className='root'>
      <header>
        <div className='header-container'>
          <div onClick={() => navigate('/')} style={{cursor: 'pointer'}}>MultiChoiz Quiz App</div>
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
        Copyright &copy; 2023
      </footer>
    </div>
  )
}
