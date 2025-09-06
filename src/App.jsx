import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css'
import Report from './pages/Report'
import Expense from './pages/Expense'
import Incomes from './pages/Incomes'
import Profile from './pages/Profile' // Import Profile component

function App() {
  const [count, setCount] = useState(0) // This useState is unused, can be removed later

  return (
    <>
      <Routes>

        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reports' element={<ProtectedRoutes><Report /></ProtectedRoutes>} /> {/* Make Report protected */}
        <Route path='/expenses' element={<ProtectedRoutes><Expense /></ProtectedRoutes>} /> {/* Make Expense protected */}
        <Route path='/incomes' element={<ProtectedRoutes><Incomes /></ProtectedRoutes>} /> {/* Make Incomes protected */}
        <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} /> {/* Add Profile route */}
      </Routes>
    </>
  )

}
export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}

export default App