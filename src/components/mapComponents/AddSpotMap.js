import React, {useState,useEffect} from 'react';
import { Map, GoogleApiWrapper,Marker, InfoWindow } from 'google-maps-react';
require("dotenv").config();

const mapStyles = {
  width: '100%',
  height: '100%',
  margin:'auto'
};
const API_KEY = process.env.REACT_APP_API_KEY

export function MapContainer ({google,setSpotLat,setSpotLng}){
  
  const [userLat,setUserLat] = useState(40.39)
  const [userLong,setUserLong] = useState(-111.7)
  const [zoomLvl,setZoomLvl] =useState(11)

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
       setUserLat(position.coords.latitude)
       setUserLong(position.coords.longitude)
       console.log('map refreshed')
      },(err)=>console.log(err))
    }else{
      alert('sorry this feature is only available if you allow us access to your location.')
    }

  },[]) 
 
    return (
      <div id="map" className ="flex-center">
      <Map

        google={google}
        zoom={zoomLvl}
        style={mapStyles}
       
        center={
          {
            lat: userLat,
            lng: userLong
          }
        }
        onClick={(ref,map,e)=>{
          setUserLat(e.latLng.lat())
          setSpotLat(e.latLng.lat())
          setUserLong(e.latLng.lng())
          setSpotLng(e.latLng.lng())
        }}
        
    >
      <Marker position ={{
            lat: userLat,
            lng: userLong
          }}
          animation = {google.maps.Animation.DROP} 
          // onClick ={(zoomLvl) =>setZoomLvl(16)}
          />
    </Map>
    </div>
    );
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
