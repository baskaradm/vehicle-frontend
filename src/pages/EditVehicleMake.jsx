import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("EditVehicleMakeViewStore")
@observer
class EditVehicleMake extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.EditVehicleMakeViewStore.getVehicleMakeById(id);
  }
  async onFormSubmit(e) {
    e.preventDefault();
    await this.props.EditVehicleMakeViewStore.editVehicleMake(
      this.props.match.params.id,
      this.props.history
    );

  }
  render() {
    const vehicleStore = this.props.EditVehicleMakeViewStore;
    return (
      <div>
        <br />
        <h4>Edit Vehicle Make:</h4>

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
          <button type="submit">Submit</button>
        </form>
        {vehicleStore.loading && <h2>Vehicle is editing...</h2>}
      </div>
    );
  }
}

export default EditVehicleMake;
