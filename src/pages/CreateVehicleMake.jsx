import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class CreateVehicleMake extends Component {
  async onFormSubmit(e) {
    e.preventDefault();
    await this.props.rootStore.createVehicleMakeViewStore.createVehicleMake(
      this.props.history
    );
  }

  render() {
    const createVehicleMakeViewStore = this.props.rootStore
      .createVehicleMakeViewStore;
    return (
      <div>
        <h2>Create</h2>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <label>
            Vehicle name:
            <input
              name="name"
              value={createVehicleMakeViewStore.vehicleMake.name || ""}
              onChange={(e) => createVehicleMakeViewStore.onChangeHandler(e)}
              type="text"
              placeholder="Name"
            />
          </label>
          <label>
            Vehicle abrv:
            <input
              name="abrv"
              value={createVehicleMakeViewStore.vehicleMake.abrv || ""}
              onChange={(e) => createVehicleMakeViewStore.onChangeHandler(e)}
              type="text"
              placeholder="Abrv"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {createVehicleMakeViewStore.loading && <h2>Vehicle is creating...</h2>}
      </div>
    );
  }
}

export default CreateVehicleMake;
