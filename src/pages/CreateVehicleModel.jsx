import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("CreateVehicleModelViewStore")
@observer
class CreateVehicleModel extends Component {

  async onFormSubmit(e) {
    e.preventDefault();
    await this.props.CreateVehicleModelViewStore.createVehicleModel(this.props.CreateVehicleModelViewStore.vehicleModel);

    if (this.props.CreateVehicleModelViewStore.isVehicleCreated) {
      //redirect
      this.props.history.push("/vehiclemodel");
    }
  }

  render() {
    const vehicleStore = this.props.CreateVehicleModelViewStore;

    return (
      <div>
        <h2>Create</h2>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <label>
            Vehicle name:
            <input
              name="name"
              value={vehicleStore.name}
              onChange={(e) => vehicleStore.onChangeHandler(e)}
              type="text"
              placeholder="Name"
            />
          </label>
          <label>
            Vehicle abrv:
            <input
              name="abrv"
              value={vehicleStore.abrv}
              onChange={(e) => vehicleStore.onChangeHandler(e)}
              type="text"
              placeholder="Abrv"
            />
          </label>
          <label>
            Vehicle id:
            <input
              name="vehiclemakeid"
              value={vehicleStore.vehiclemakeid}
              onChange={(e) => vehicleStore.onChangeHandler(e)}
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
