import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProtectedRoute from './ProtectedRoute'

export const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]
