import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { navData } from '../navComponents/NavData'
import {CgMenu} from 'react-icons/cg'
import {toast} from 'react-toastify'

function Header({loginStatus,updateLoginStatus}) {
  const [sideBar, setSideBar] = useState(false)
  const displayMenu = () => {
    setSideBar(!sideBar)
  }
  const logOut = ()=>{
    toast.info('You have Logged out')
    localStorage.clear()
    updateLoginStatus(false)
  }
  
  return (
    <div className="flex-center">
    <header className="flex-center">
      <div className="menu-icon"><CgMenu 
      onClick={displayMenu} 
      size ={30}
      style={{width:'50px',height:'30px',marginTop:'5px'}}
      /></div>
       <h1 className="noselect">Line Project</h1>
      {loginStatus ?<button onClick={logOut}>Log Out</button>:
      // Login/Register
      <div className="login-link"><Link to ="/login"><h3>Login/</h3><h3>Register</h3></Link></div>
      }
      
      </header>

      <nav className={sideBar ? "side-bar-active flex-center" : "side-bar flex-center"}>
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
