const spots = require ("../models/spots")
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
}
