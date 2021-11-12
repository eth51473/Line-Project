import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { navData } from '../navComponents/NavData'
import {CgMenu} from 'react-icons/cg'
import {MdLogout} from 'react-icons/md'
import {toast} from 'react-toastify'

function Header({loginStatus,updateLoginStatus,updateSignUpStatus,sideBar,setSideBar}) {
  const displayMenu = () => {
    setSideBar(!sideBar)
  }
  const logOut = ()=>{
    toast.info('You have Logged out')
    localStorage.clear()
    updateLoginStatus(false)
    updateSignUpStatus(false)
  }
  
  return (
    <div className="flex-center entire-header nav-color">
    <header className="flex-center">
      <div className="menu-icon"><CgMenu 
      onClick={displayMenu} 
      style={{width:'50px',height:'40px',marginTop:'15px'}}
      /></div>
       <Link to="/"><h1 className="noselect">Line Project</h1></Link>
      {loginStatus ?<button className="logout noselect" onClick={logOut}>Log Out</button>:
      // Login/Register
      <div className="login-link"><Link to ="/login"><h3>Login/</h3><h3>Register</h3></Link></div>
      }
     
      </header>
      <nav className={sideBar ? "side-bar-active flex-center nav-color" : "side-bar flex-center nav-color"}>
      <ul>
        {navData.map((item,index)=>{
          return(
            <li key={index}>
              <Link onClick ={()=>sideBar? displayMenu(): null} to={item.path}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
    </div>
  )
}

export default Header
