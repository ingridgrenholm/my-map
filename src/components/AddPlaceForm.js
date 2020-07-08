import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import List from "../App.js";

class AddPlaceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      lat: "",
      lng: "",
    };
    
   
  }

  onTextChange(event) =>  {
    this.setState({ value: event.target.value });
  }

  onSubmit = (event) => {
    let name = this.state.value;

    this.props.onAddPlace(name);

    event.preventDefault();
  };

  onCloseInputForm = () => {
    this.setState({ showForm: false });
  };

  render() {
    return (
      <form className="add-place-form" onSubmit={this.onSubmit}>
        <h1>Spara platsen i din lista</h1>

        <input
          className="form__input"
          type="text"
          placeholder="Namn"
          value={this.state.value}
          onChange={this.onTextChange}
        />

        <Button onClick={this.onSubmit}>Spara</Button>
      </form>
    );
  }
}

export default AddPlaceForm;
