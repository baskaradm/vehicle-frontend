import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("VehicleMakeStore")
@observer
class VehicleMakeFiltering extends Component {
  onChangeHandler(e) {
    this.props.VehicleMakeStore.searchString = e.target.value;
  }

  async onFilterSubmit() {
    await this.props.VehicleMakeStore.getVehicleMakes();
  }
  render() {
    const vehicleStore = this.props.VehicleMakeStore;

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

export default VehicleMakeFiltering;
