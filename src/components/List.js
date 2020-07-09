import React, { Component, Fragment } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

class List extends Component {
  handleListItemClick = () => {
    let center = [this.props.place.geo.lat, this.props.place.geo.lng];
    let zoom = 16;
    let show = this.props.place.show;

    this.props.onListItemClick(center, zoom, show);
  }

  render() {
    let name = this.props.place.name;
    let place = this.props.place;

    return (
      <ListGroup>
        <ListGroupItem onClick={this.handleListItemClick}>
          {name}
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default List;
