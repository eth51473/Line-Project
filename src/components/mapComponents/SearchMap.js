import React, {useState,useEffect} from 'react';
import GoogleMapReact, { Map, GoogleApiWrapper,Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
require("dotenv").config();

const mapStyles = {
  position:'relative',
  width: '70%',
  height: '60%',
  margin:'10px auto 10px auto'
};
const API_KEY = process.env.REACT_APP_API_KEY
export function MapContainer ({google}){
  const [userLat,setUserLat] = useState(40.39)
  const [userLong,setUserLong] = useState(-111.7)
  const [markerList,setMarkerList] =useState([])
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
       setUserLat(position.coords.latitude)
       setUserLong(position.coords.longitude)
      },(err)=>console.log(err))
    }else{
      alert('sorry this feature is only available if you allow us access to your location.')
    }
      axios.get('http://localhost:3001/api/getcoords')
      .then((req,res)=>{
        console.log(req.data)
          const markerPos =req.data[0].map((item)=>{
          return (item.coords)
          })
          setMarkerList(markerList => [markerList,...markerPos])
        }).catch((err)=>console.log(err))
        
  },[]) 
  
    return (
      <div id="map" className ="flex-center">
      <Map

        google={google}
        zoom= {11}
        style={mapStyles}
       
        center={
          {
            lat: userLat,
            lng: userLong
          }
        }
        
    >
      {markerList.map((item,index)=>{
        if(item.lat === '' || item.lng ===''){
          console.log('bad cookie')
        }else{
          console.log('reload markers')
        return(
          <Marker 
          key={index} 
          position={{
            lat: item.lat,
            lng: item.lng
          }
          }
          animation = {google.maps.Animation.DROP}
          style={{color:'red'}}
          label={`${item.label}`}
          />
        )
        }
      })
    
      }
      {/* <Marker position ={{
            lat: 40.39,
            lng: -111.7
          }} /> */}
      
      
    </Map>
    </div>
    );
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
