import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import Header from './homeComponents/Header'
import Body from './homeComponents/LandingPage'
import SearchPage from './searchPageComponents/SearchPage'
import Login from './loginComponents/Login'
import  Map from './Map'
import SignUp from './loginComponents/SignUp'
function App() {
  return (
    <div>
      <Header />
      
      <Switch>
      
        <Route exact path = "/">
          <Body />
        </Route>

        <Route exact path = "/search">
          <SearchPage />
        </Route>

        <Route exact path = "/login">
          <Login />
        </Route>

        <Route exact path = "/map">
          <Map />
        </Route>

        <Route exact path = "/signup">
          <SignUp />
        </Route>
        
      </Switch>
    </div>
  )
}

export default App
