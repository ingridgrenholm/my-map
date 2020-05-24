import React, { Component, Fragment } from "react";
import GoogleMap from "google-map-react";
import myPlaces from "./data.json";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import AddPlaceForm from "./components/AddPlaceForm";
import List from "./components/List";
import { GoogleApiWrapper } from "google-maps-react";
import isEmpty from "lodash.isempty";
import "./App.css";

const InfoWindow = (props) => {
  const { place } = props;
  const infoWindowStyle = {
    position: "relative",
    bottom: 70,
    left: "-110px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100,
    textAlign: "center",
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{place.name}</div>
    </div>
  );
};

const Marker = (props) => {
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 12,
    width: 12,
    backgroundColor: props.show ? "#6666FF" : "#282866",
    cursor: "pointer",
    zIndex: 10,
  };

  return (
    <Fragment>
      <div style={markerStyle} />
      {props.show && <InfoWindow place={props.place} />}
    </Fragment>
  );
};

class MyMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [59.334591, 18.06324],
      zoom: 11,

      myPlaces: [],
      inputForm: false,

      newlat: null,
      newlng: null,
    };

    this.onAddPlace = this.onAddPlace.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
  }

  onMapClicked = ({ lat, lng }) => {
    this.openInputForm(lat, lng);
  };

  openInputForm = (lat, lng) => {
    this.setState({
      inputFormOpen: true,
      newlat: lat,
      newlng: lng,
    });
  };

  componentDidMount() {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((place) => {
          place.show = false;
        });
        this.setState({ myPlaces: data });
      });
  }

  onAddPlace = (name) => {
    this.setState({
      id: this.state.myPlaces.length + 1,
    });

    const newPlace = {
      id: '"' + this.state.id + '"',
      name: name,
      geo: {
        lat: this.state.newlat,
        lng: this.state.newlng,
      },
    };

    this.setState({
      inputFormOpen: false,
      myPlaces: this.state.myPlaces.concat(newPlace),
    });

    return myPlaces;
  };

  onChildClickCallback = (key, childProps) => {
    this.setState((state) => {
      const a = state.myPlaces.findIndex((e) => e.id === key);
      state.myPlaces[a].show = !state.myPlaces[a].show;
      return { myPlaces: state.myPlaces };
    });
  };

  onListItemClick = (center, zoom, show) => {
    this.setState({
      center: center,
      zoom: zoom,
      show: true,
    });
  };

  render() {
    const listitem = this.state.myPlaces
      .slice(10, 20)
      .map((place) => (
        <List
          onListItemClick={this.onListItemClick.bind(this)}
          place={place}
          show={place.show}
        />
      ));

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        {this.state.inputFormOpen && (
          <div className="add-place-container">
            <AddPlaceForm onAddPlace={this.onAddPlace} />
          </div>
        )}

        {!isEmpty(listitem) && (
          <div className="saved-place-container">
            <span>Dina sparade platser</span>
            {listitem}
          </div>
        )}

        {!isEmpty(myPlaces) && (
          <GoogleMap
            bootstrapURLKeys={{
              key: "AIzaSyAQqErv6aS94dMloNrjcRxLFdwru1ALebc",
            }}
            center={this.state.center}
            zoom={this.state.zoom}
            onClick={this.onMapClicked}
            onChildClick={this.onChildClickCallback}
          >
            {this.state.myPlaces.map((place) => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geo.lat}
                lng={place.geo.lng}
                show={place.show}
                place={place}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    );
  }
}

export default MyMap;
