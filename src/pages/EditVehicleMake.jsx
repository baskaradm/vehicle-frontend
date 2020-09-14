import React, { Component } from "react";
import { inject, observer } from "mobx-react";
@inject("VehicleMakeStore")
@observer
class EditVehicleMake extends Component {
  state = {
    name: "",
    abrv: "",
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.VehicleMakeStore.getVehicleMakeById(id);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onFormSubmit(e) {
    e.preventDefault();
    console.log("Submitted form!!!!!!!!");

    await this.props.VehicleMakeStore.editVehicleMake(
      this.state,
      this.props.match.params.id
    );

    if (this.props.VehicleMakeStore.isVehicleUpdated) {
      //redirect
      this.props.history.push("/vehiclemake");
    }
  }
  render() {
    const vehicleStore = this.props.VehicleMakeStore;

    return (
      <div>
        <br />
        <h4>Edit Vehicle Make:</h4>

        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <label>
            Vehicle name:
            <input
              name="name"
              value={this.state.name}
              onChange={(e) => this.onChangeHandler(e)}
              type="text"
              placeholder="Name"
            />
          </label>
          <label>
            Vehicle abrv:
            <input
              name="abrv"
              value={this.state.abrv}
              onChange={(e) => this.onChangeHandler(e)}
              type="text"
              placeholder="Name"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {vehicleStore.loading && <h2>Vehicle is editing...</h2>}
      </div>
    );
  }
}

export default EditVehicleMake;
