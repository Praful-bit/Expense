
import { useContext } from 'react'
import './App.css'
import LoginPage from './components/SignUp/LoginPage'
import { AuthContext } from './Context/AuthContext'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import User from './components/User/User'


function App() {
  const {token} = useContext(AuthContext)

  return (
    <>
     {!token && <LoginPage/>}
     {token && (
      <div>
        <Header/>
        <User/>
        <Outlet/>
      </div>
     )}
    </>
  )
}

export default App
