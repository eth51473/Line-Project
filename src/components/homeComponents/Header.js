import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { navData } from '../navComponents/NavData'
import {CgMenu} from 'react-icons/cg'
function Header() {
  const [sideBar, setSideBar] = useState(false)
  const displayMenu = () => {
    setSideBar(!sideBar)
  }
  
  return (
    <div className="flex-center">
    <header className="flex-center">
      <CgMenu onClick={displayMenu} /> 
      <Link to="/"> <h1>Line Project</h1></Link>
      <Link to ="/login">Login</Link>
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
