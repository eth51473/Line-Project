import React,{useState,useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router'
import Header from './homeComponents/Header'
import Body from './homeComponents/LandingPage'
import SearchPage from './searchPageComponents/SearchPage'
import Login from './loginComponents/Login'
import  Map from './Map'
import SignUp from './loginComponents/SignUp'
import AddPost from './AddPost'
import axios from 'axios'
function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(()=>{
    
    axios.get('http://localhost:3001/api/isuserauth',{
      headers:{
        "x-access-token":localStorage.getItem("token")
      }
    }).then((res)=>{
      if(res.data.auth){
        setIsLoggedIn(true)
    }else{
      console.log(res)
    }
  })
  },[])
  return (
    <div>
      <Header loginStatus= {isLoggedIn} updateLoginStatus={setIsLoggedIn}/>
      
      <Switch>
      
        <Route exact path = "/">
          <Body />
        </Route>

        <Route exact path = "/search">
          <SearchPage />
        </Route>

        <Route exact path = "/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login 
          loginStatus = {isLoggedIn}
          updateLoginStatus ={setIsLoggedIn}
          />}
          
        </Route>

        <Route exact path = "/map">
          <Map />
        </Route>

        <Route exact path = "/signup">
          <SignUp />
        </Route>
        
        <Route exact path = "/addspot">
        {!isLoggedIn ? <Redirect to="/" /> : <AddPost
          />}
        </Route>

      </Switch>
    </div>
  )
}

export default App
