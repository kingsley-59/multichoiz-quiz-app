import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import { Provider } from 'react-redux'
import { store } from './app/store'

import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import { Login, SignUp } from './pages/Auth'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'quiz',
        element: <Quiz />
      },
      {
        path: 'result',
        element: <Result />
      },
    ]
  }
])

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}