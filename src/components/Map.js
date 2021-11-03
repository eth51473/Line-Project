import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow,Marker } from 'google-maps-react';
require("dotenv").config();
const mapStyles = {
  width: '500px',
  height: '250px'
};
const {apiKey} = process.env
export class MapContainer extends Component {
  
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div id="mapPlacement" className ="flex-center">
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={
          {
            lat: 40.393963,
            lng: -111.790111
          }
        }
      >
    </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey
})(MapContainer);
