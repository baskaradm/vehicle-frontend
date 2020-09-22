import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("VehicleModelStore")
@observer
class CreateVehicleModel extends Component {
  state = {
    name: "",
    abrv: "",
    vehiclemakeid: "",
  };

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onFormSubmit(e) {
    e.preventDefault();
    await this.props.VehicleModelStore.createVehicleModel(this.state);

    if (this.props.VehicleModelStore.isVehicleCreated) {
      //redirect
      this.props.history.push("/vehiclemodel");
    }
  }

  render() {
    const vehicleStore = this.props.VehicleModelStore;

    return (
      <div>
        <h2>Create</h2>
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
            Vehicle abrv:
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

        {vehicleStore.loading && <h2>Vehicle is creating...</h2>}
      </div>
    );
  }
}

export default CreateVehicleModel;
