import React, { useEffect, useState} from "react";
import {Link } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import { GrMapLocation } from "react-icons/gr";
import { MdExpandLess } from "react-icons/md";
import {RiDeleteBin3Line} from 'react-icons/ri'
import {BiRefresh} from 'react-icons/bi'
import {IconContext} from 'react-icons'
function BookmarkUpdate() {
  const [spotInfo, setSpotInfo] = useState([]);
  const [open,setOpen]= useState(false)
  const closeModal = () => setOpen(false)
  const [openInner,setOpenInner]= useState(false)
  const closeInnerModal = () => setOpenInner(false)
  const [loading,setLoading]=useState(true)

  const deleteBookmark= (curSpot)=>{
    console.log('hello')
    console.log(curSpot)
    
    axios.delete('/api/deletebookmark',{data:{spot:curSpot,username:localStorage.getItem('user')}}).then((req,res)=>{
      closeInnerModal();
    }).catch((err)=>console.log(err))
    
  }
  useEffect(() => {
    axios
      .get(`/api/bookmarks`, {
        headers: {
          username: localStorage.getItem("user"),
        },
      })
      .then((req, res) => {
        req.data[0].map((spot, index) => {
          axios
            .get(`/api/savedspots`, {
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
              
            })
            .catch((err) => {
              console.log(err);
            }); 
        });
        setLoading(false)
      })
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <div className="flex-center">
      <div className="flex-center body-info flex-column">
        <h1>My Bookmarks</h1>
        <Link to='/bookmarks' className={loading?'refresh-icon':''}><BiRefresh size={35} 
        style={{
          color:'black'
      }}
      /></Link>
        <div className="flex-center flex-column">
          {spotInfo.map((favSpot, index) => {
            return (
              <div className="spot-card" key={index}>
                <h3>
                  {favSpot.title} ({favSpot.line_length}ft)
                  
                  <Popup
                    closeOnDocumentClick
                    onClose ={closeModal}
                    contentStyle={{
                      padding: "20px",
                      width: "325px",
                    }}
                    trigger ={<span className="expand" >
                          <MdExpandLess size={25} />
                        </span>}
                    modal
                    nested
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
                        left: "310px",
                        top: "-5px",
                      }}
                    >
                        <span className="expand" onClick={()=>setOpenInner(true)}>
                        <RiDeleteBin3Line size={30} />
                      </span>
                      <Popup
                    open={openInner}
                    closeOnDocumentClick
                    onClose ={closeInnerModal}
                    contentStyle={{
                      padding: "20px",
                      width: "300px",
                    }}
                    // trigger={
                      // <span className="expand">
                      //   <RiDeleteBin3Line size={30} />
                      // </span>
                    // }
                    modal
                    nested
                    position="top center"
                  >
                    <div>
                      <p>Are you sure you want to delete this spot?</p>
                      <div className="flex-center">
                      <button className="bookmark-btn-inner" onClick={closeInnerModal}> Not Now</button>
                      <button onClick={()=> deleteBookmark(favSpot.title)}className="bookmark-btn-inner">Delete</button>
                      </div>
                    </div>
                    </Popup>
                      
                    </button>
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

export default BookmarkUpdate;
