import React,{useState} from 'react'
import axios from 'axios'
function SearchPage() {
  const [allSpots, setAllSpots] = useState([])

  const makeRequest = async() =>{
  const res = await axios.get('http://localhost:3001/api/findspots')
    setAllSpots(res.data.map((spot,index)=>{
      return(
        <div key={index}>{spot.title}</div>
     )
     }))
  }

  return (
    <div className="flex-center flex-column">
      <h2>Search by City</h2>
      <input type ="text" />
      <button onClick={makeRequest}>See All</button>
      {allSpots}
    </div>
  )
}

export default SearchPage
