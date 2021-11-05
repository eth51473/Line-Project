import React,{useState} from 'react'
import axios from 'axios'
function SearchPage() {
  const [allSpots, setAllSpots] = useState([])
  const [searchTxt,setSearchTxt] = useState('')
  const makeRequest = async() =>{
  const res = await axios.get(`http://localhost:3001/api/findspots`, {params:{searchTxt}})
  console.log(res.data[0])
    setAllSpots(res.data[0].map((spot,index)=>{
      return(
        <div 
        className="spot-card"
        key={index}>
        <h3>{spot.title}</h3>
        <p>Line Length:{spot.line_length}(ft)</p>
        <p>Description:</p>
        <p>{spot.description.split(' ').slice(0, 10).join(' ')}...</p>
        </div>
     )
     }))
  }

  return (
    <div className="flex-center flex-column search-page">
      <h2>Search by City</h2>
      <input type ="text" value={searchTxt.toLowerCase()} onChange={(e)=>setSearchTxt(e.target.value)}/>
      <div>
      <button className="search-btn"onClick={makeRequest}>Search</button>
      {allSpots}
      </div>
    </div>
  )
}

export default SearchPage
