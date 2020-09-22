import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("VehicleModelStore")
@observer
class EditVehicleModel extends Component {
  state = {
    name: "",
    abrv: "",
    vehiclemakeid: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.VehicleModelStore.getVehicleModelById(id);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onFormSubmit(e) {
    e.preventDefault();

    await this.props.VehicleModelStore.editVehicleModel(
      this.state,
      this.props.match.params.id
    );

    if (this.props.VehicleModelStore.isVehicleUpdated) {
      this.props.history.push("/vehiclemodel");
    }
  }
  render() {
    const vehicleStore = this.props.VehicleModelStore;

    return (
      <div>
        <br />
        <h4>Edit Vehicle Model:</h4>

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
              placeholder="Abrv"
            />
          </label>
          <label>
            Vehicle Make Id:
            <input
              name="vehiclemakeid"
              value={this.state.vehiclemakeid}
              onChange={(e) => this.onChangeHandler(e)}
              type="text"
              placeholder="VehicleMakeId"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {vehicleStore.loading && <h2>Vehicle is editing...</h2>}
      </div>
    );
  }
}

export default EditVehicleModel;
