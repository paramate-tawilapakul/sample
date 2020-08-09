import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import AuthContext from './context/auth/context'
import authStorage from './context/auth/storage'
import Header from './components/Header'
import Home from './pages/Home'
import Data from './pages/Data'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './components/404NotFound'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [user, setUser] = useState(null)

  const restoreUser = () => {
    const user = authStorage.getUser()
    if (user) setUser(user)
  }

  useEffect(() => {
    restoreUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/data' component={Data} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route component={NotFound} />
            {/* <Route path='/404' component={NotFound} />
            <Redirect to='/404' /> */}
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
