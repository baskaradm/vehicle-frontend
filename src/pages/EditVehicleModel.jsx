import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("EditVehicleModelViewStore")
@observer
class EditVehicleModel extends Component {


  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.EditVehicleModelViewStore.getVehicleModelById(id);
  }

  async onFormSubmit(e) {
    e.preventDefault();

    await this.props.EditVehicleModelViewStore.editVehicleModel(
      this.props.EditVehicleModelViewStore.vehicleModel,
      this.props.match.params.id
    );

    if (this.props.EditVehicleModelViewStore.isVehicleUpdated) {
      this.props.history.push("/vehiclemodel");
    }
  }
  render() {
    const vehicleStore = this.props.EditVehicleModelViewStore;

    return (
      <div>
        <br />
        <h4>Edit Vehicle Model:</h4>

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
            Vehicle Make Id:
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
        {vehicleStore.loading && <h2>Vehicle is editing...</h2>}
      </div>
    );
  }
}

export default EditVehicleModel;
