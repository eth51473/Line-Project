import React, {useState,useEffect} from 'react';
import GoogleMapReact, { Map, GoogleApiWrapper,Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
require("dotenv").config();

const mapStyles = {
  position:'relative',
  width: '500px',
  height: '250px',
  margin:'10px auto 10px auto'
};
const {GAPI_KEY} = process.env

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
        
          const markerPos =req.data[0].map((item)=>{
            console.log(item)
          return (item.coords)
          })
          setMarkerList(markerList => [markerList,...markerPos])
        }).catch((err)=>console.log(err))
        
  },[]) 
  
    return (
      <div id="map" className ="flex-center">
      <Map

        google={google}
        zoom={13}
        style={mapStyles}
       
        center={
          {
            lat: userLat,
            lng: userLong
          }
        }
        
    >
      <Marker 
      position ={{
            lat: userLat,
            lng: userLong
          }}
      label="you are here amigo" />
      {markerList.map((item,index)=>{
        console.log(item)
        return(
          <Marker key={index} position={{
            lat: item.lat,
            lng: item.lng
          }}
          label={`${item.label}`}
          />
        )
        
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
  apiKey: ''
})(MapContainer);
