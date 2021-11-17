import React from "react";
import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import {BsPinMap,BsBookmarkStar} from 'react-icons/bs'
function Body() {
  return (
    <div className="flex-center">
      <div className="flex-center body-info flex-column">
        <h1>Welcome to Line Project!</h1>
        <h2>The slacklining database built for you,</h2>
        <h2>by you</h2>
        <div className="icon-box">
          <Link to="/map">
            <BsPinMap size={60} />
            <h3>Near Me</h3>
          </Link>

          <br />
          <Link to="/addspot">
            <FiPlusCircle size={60} />
            <h3>Add Spot</h3>
          </Link>
          <Link to="/search">
            <BiSearchAlt size={60} />
            <h3>Search</h3>
          </Link>
          <Link to='/bookmarks'>
          <BsBookmarkStar size={60} />
          <h3>My Spots</h3>
          </Link>
        </div>
      </div>
     
    </div>
  );
}

export default Body;
