import React,{useState} from 'react'
import axios from 'axios'
function AddPost() {
  const [title,setTitle] = useState('')
  const [lineLength,setLineLength] = useState('')
  const [descrip,setDescrip] = useState('')
  const [city,setCity] = useState('')
  const submitHandler = async(e) =>{
    e.preventDefault()
    await axios.post('http://localhost:3001/api/newspot',{
      title,
      lineLength,
      descrip,
      city
    })
  }
  return (
    <div className="flex-center">
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title:</label>
        <input 
        type="text" 
        id="title" 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        
        

        <label htmlFor="line-length">line-length (ft)</label>
        <input 
        type="text" 
        id="line-length"
        value={lineLength}
        onChange={(e)=> setLineLength(e.target.value)}
        />

        <label htmlFor="description">description</label>
        <textarea 
        id="description"
        rows={5}
        cols={28}
        value={descrip}
        onChange={(e)=> setDescrip(e.target.value)}
        >
        </textarea>

        <label htmlFor="location">City:</label>
        <input 
        type="text" 
        id="location"
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default AddPost
