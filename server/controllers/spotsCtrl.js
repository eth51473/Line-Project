const spots = require ("../models/spots")
const users = require ("../models/users")
const seq = require('../database/seq')
module.exports ={
  newSpot: async(req,res) =>{
    const{title,line_length,description,location,coords} = req.body;
    console.log(title)
    try {
      const spotCheck = await seq.query(`SELECT * FROM spots WHERE title = '${title}'`)
    if(spotCheck[1].rowCount > 0){
      res.status(401).send('spot with this name already exists')
    }else{
      const newSpot = await spots.create({
        title,
        line_length,
        description,
        location,
        coords
      })
      res.json(newSpot)
    }
    } catch (error) {
      console.log(error)
    }
  },
  getSpots: async(req,res) =>{
    const {searchTxt} = req.query
    
    try{
      const spotList = await seq.query(`SELECT * FROM spots WHERE location LIKE '%${searchTxt}%'`)
      console.log(searchTxt);
      res.status(200).send(spotList)
    } catch{
      console.log('no dice')
    }
  },
  allCoords: async(req,res) =>{
    try{
      const coords = await seq.query(`SELECT coords FROM spots`)
      res.status(200).send(coords)
    } catch{
      console.log('no dice')
    }
  },
  bookmarks: async(req,res)=>{
    try{
      let curUser = req.headers.username
      const currentUserId = await seq.query(`SELECT * FROM users WHERE username = '${curUser}'`)

      let curId = currentUserId[1].rows[0].id
      const bookmarks = await seq.query(`SELECT * FROM bookmarked_spots WHERE user_id ='${curId}'`)
      res.status(200).send(bookmarks)
    }catch{
      console.log(`request didn't work`)
    }
  },
  newBookmark: async(req,res)=>{
    try {
      let {username, spotid} = req.headers
      const userQuery = await seq.query(`SELECT * FROM users WHERE username = '${username}'`)
      let curId = userQuery[1].rows[0].id
      const checkBookmarks = await seq.query(`SELECT * FROM bookmarked_spots WHERE user_id = '${curId}' AND spot_id ='${spotid}' `)
      if(checkBookmarks[1].rowCount >0){
        res.send('spot already exists')
      }else{
        const updateBookmarks = await seq.query(`INSERT INTO bookmarked_spots(user_id, spot_id)
      VALUES(${curId},${spotid})`)
      res.status(200).send('bookmark successful')
      }
      
    } catch (error) {
      res.send(error)
    }
  },
  savedSpots: async(req,res) =>{
    const {spot} = req.headers
    const favSpot = await seq.query(`SELECT * FROM spots WHERE id ='${spot}'`)
    res.send(favSpot)
  },
  delete: async(req,res) =>{
    const {spot,username} = req.body
    const findUser = await seq.query(`SELECT * FROM users WHERE username = '${username}'`)
    const userId = findUser[1].rows[0].id
    const findId = await seq.query(`SELECT id FROM spots WHERE title= '${spot}'`)
    const removeSpot = await seq.query(`DELETE FROM bookmarked_spots WHERE spot_id ='${findId[0][0].id}' AND user_id='${userId}'`)
    res.status(200).send('good job')
  }
}
