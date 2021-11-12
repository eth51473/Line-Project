import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Bookmark() {
  const [spotInfo,setSpotInfo]=useState([])
  const [savedSpots,setSavedSpots] = useState([])
  useEffect(()=>{
    
  },[])
  const testClick = () =>{

    axios.get(`http://localhost:3001/api/bookmarks`, {
      headers:{
        "username":localStorage.getItem("user")
      },
    })
  .then((req,res)=>{
    
    req.data[0].map((spot,index)=>{
      axios.get(`http://localhost:3001/api/savedspots`,{
        headers:{
          "spot": spot.spot_id
        }
      }).then((req,res)=>{
        setSpotInfo((spotInfo)=> [...spotInfo, req.data[0][0].title])
        
      //  setSpotInfo([...spotInfo, req.data[0][0].title])
      }
        ).catch((err)=>{console.log(err)})
    }
    )
    const renderedList = spotInfo.map((favSpot,index)=>{
      return(
        <div key={index}>
          
        </div>
      )
    })
  }).catch((err)=> console.log(err))
  }

  return (
    <div className="flex-center">
      <div className="flex-center body-info flex-column">
        <h1>My Bookmarks</h1>
        <button onClick={testClick}>test</button>
        <div>{spotInfo}</div>
      </div>
    </div>
  );
}

export default Bookmark;