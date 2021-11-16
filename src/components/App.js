import React,{useState,useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router'
import Header from './homeComponents/Header'
import Body from './homeComponents/LandingPage'
import SearchPage from './searchPageComponents/SearchPage'
import Login from './loginComponents/Login'
import  Map from './mapComponents/SearchMap'
import SignUp from './loginComponents/SignUp'
import AddPost from './AddPost'
import axios from 'axios'
import { toast } from 'react-toastify'
import Bookmark from './Bookmark'
import BookmarkUpdate from './BookmarkUpdate'
function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [signUpStatus,setSignUpStatus] = useState(false)
  const [sideBar, setSideBar] = useState(false)
  useEffect(()=>{
    
    axios.get('/api/isuserauth',{
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
    <div className="noselect">
      <Header 
      loginStatus= {isLoggedIn} 
      updateLoginStatus={setIsLoggedIn} 
      updateSignUpStatus={setSignUpStatus}
      sideBar ={sideBar}
      setSideBar={setSideBar}
      />
      
      <Switch>
      
        <Route exact path = "/">
          <Body />
        </Route>

        <Route exact path = "/search">
          <SearchPage 
          sideBar ={sideBar}
          setSideBar={setSideBar}
          />
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
          {signUpStatus ? <Redirect to="/login" /> : <SignUp signUpStatus= {setSignUpStatus}/>}
        </Route>
        
        <Route exact path = "/addspot">
        {!isLoggedIn ? <Redirect to="/login" />: 
        <AddPost />}
        </Route>

        <Route exact path = "/bookmarks">
          {!isLoggedIn? <Redirect to="/login" />:
          <Bookmark/>}
        </Route>

        <Route exact path = "/bookmarkupdate">
          {!isLoggedIn? <Redirect to="/login" />:
          <BookmarkUpdate />}
        </Route>

      </Switch>
    </div>
  )
}

export default App
