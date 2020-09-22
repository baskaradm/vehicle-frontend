import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("VehicleModelStore")
@observer
class VehicleModelFiltering extends Component {
  onChangeHandler(e) {
    this.props.VehicleModelStore.searchString = e.target.value;
  }

  async onFilterSubmit() {
    await this.props.VehicleModelStore.getVehicleModels();
  }
  render() {
    const vehicleStore = this.props.VehicleModelStore;

    return (
      <div>
        <input
          type="text"
          value={vehicleStore.searchString}
          placeholder="Search for vehicles"
          onChange={(e) => this.onChangeHandler(e)}
        />
        <button onClick={() => this.onFilterSubmit()}>Find</button>
      </div>
    );
  }
}

export default VehicleModelFiltering;
