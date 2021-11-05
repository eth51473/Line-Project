import React from 'react'
import { Link } from 'react-router-dom'
function Body() {
  return (
    <div className="flex-center">
      <div className="flex-center body-info flex-column">
        <h2>Welcome to Line Project!</h2>
        <img src="https://spider-slacklines.com/images/slackline/highline.jpg" />
        <Link to="/map">Spots Near Me</Link>
        <br />
        <Link to="/addspot">Add a spot</Link>
      </div>
    </div>
  )
}

export default Body
