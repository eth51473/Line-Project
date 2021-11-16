import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { MdExpandLess } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { BsBookmarkStar } from "react-icons/bs";
import { toast } from "react-toastify";
function SearchPage({ sideBar, setSideBar }) {
  const [allSpots, setAllSpots] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [addPostTxt, setAddPostTxt] = useState(false);
  const saveSpot = async (id) => {
    let curUser = localStorage.getItem("user");
    if (curUser) {
      const bookmarkRes = await axios.get(
        `/api/newbookmark`,
        {
          headers: {
            spotid: id,
            username: curUser,
          },
        }
      );
      console.log(bookmarkRes)
      toast.success('successfully bookmarked!, navigate to the my spots page to view your saved spots')
      // toast.success('spot bookmarked!')
    } else {
      toast.info("you must be logged in to bookmark a spot");
    }
  };
  const makeRequest = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/api/findspots`, {
      params: { searchTxt },
    });
    if (res.data[0].length > 0) {
      setAddPostTxt(false);
      setAllSpots(
        res.data[0].map((spot, index) => {
          return (
            <div className="spot-card" key={index}>
              <h3>
                {spot.title} ({spot.line_length}ft)
                <Popup
                  contentStyle={{
                    padding: "20px",
                    width: "350px",
                  }}
                  trigger={
                    <span className="expand">
                      <MdExpandLess size={25} />
                    </span>
                  }
                  modal
                  position="top center"
                >
                  <div className="modal">
                    <button
                      className="bookmark-btn"
                      style={{
                        position: "relative",
                        display: "inline",
                        background: "none",
                        border: "none",
                        left: "330px",
                        top: "-5px",
                      }}
                      onClick={() => saveSpot(spot.id)}
                    >
                      <BsBookmarkStar size={25} />
                    </button>
                    <h3
                      style={{
                        marginBottom: "5px",
                        display: "inline",
                        position: "relative",
                        left: "-30px",
                      }}
                    >
                      {spot.title}
                    </h3>
                    <p style={{ marginBottom: "5px" }}>
                      Line Length:{spot.line_length}(ft)
                    </p>
                    <p>Description:</p>
                    <p style={{ marginBottom: "20px" }}>{spot.description}</p>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${spot.coords.lat},${spot.coords.lng}`}
                      target="_blank"
                    >
                      <GrMapLocation size={25} style={{ marginRight: "5px" }} />
                      directions
                    </a>
                  </div>
                </Popup>
              </h3>
            </div>
          );
        })
      );
    } else {
      setAddPostTxt(true);
    }
  };

  return (
    <div className="flex-center flex-column search-page">
      <h2>Search by City</h2>
      <form onSubmit={makeRequest} className="search-form">
        <input
          type="text"
          value={searchTxt.toLowerCase()}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <BiSearchAlt size={30} />
        </button>
      </form>
      {addPostTxt ? (
        <div>
          <p>No search Results, </p>
          <Link to="/addspot">Add Your own?</Link>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex-cards">{allSpots}</div>
    </div>
  );
}

export default SearchPage;
