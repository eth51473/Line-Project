const spots = require ("../models/spots")
module.exports ={
  newSpot: async(req,res) =>{
    const{title,line_length,description,location} = req.body;
  
    const newSpot = await spots.create({
      title,
      line_length,
      description,
      location
    })
    res.json(newSpot)
  },
  getSpots: async(req,res) =>{
    try{
      const spotList = await spots.findAll();
      console.log(spotList);
      res.status(200).send(spotList)
    } catch{
      console.log('no dice')
    }
  }
}
