import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import { GrMapLocation } from "react-icons/gr";
import { MdExpandLess } from "react-icons/md";
function Bookmark() {
  const [spotInfo, setSpotInfo] = useState([]);
  const [renderedList, setRenderedList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/bookmarks`, {
        headers: {
          username: localStorage.getItem("user"),
        },
      })
      .then((req, res) => {
        req.data[0].map((spot, index) => {
          axios
            .get(`http://localhost:3001/api/savedspots`, {
              headers: {
                spot: spot.spot_id,
              },
            })
            .then((req, res) => {
              const info = req.data[0][0];
              setSpotInfo((spotInfo) => [
                ...spotInfo,
                {
                  title: info.title,
                  line_length: info.line_length,
                  description: info.description,
                  coords: info.coords,
                },
              ]);
              console.log(spotInfo);
              //  setSpotInfo([...spotInfo, req.data[0][0].title])
            })
            .catch((err) => {
              console.log(err);
            });
        });
        console.log(spotInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex-center">
      <div className="flex-center body-info flex-column">
        <h1>My Bookmarks</h1>

        <div className="flex-center flex-column">
          {spotInfo.map((favSpot, index) => {
            return (
              <div className="spot-card" key={index}>
                <h3>
                  {favSpot.title} ({favSpot.line_length}ft)
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
                      <h3 style={{ marginBottom: "5px" }}>{favSpot.title}</h3>
                      <p style={{ marginBottom: "5px" }}>
                        Line Length:{favSpot.line_length}(ft)
                      </p>
                      <p>Description:</p>
                      <p style={{ marginBottom: "20px" }}>
                        {favSpot.description}
                      </p>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${favSpot.coords.lat},${favSpot.coords.lng}`}
                        target="_blank"
                      >
                        <GrMapLocation
                          size={20}
                          style={{ marginRight: "5px" }}
                        />
                        directions
                      </a>
                    </div>
                  </Popup>
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
