import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("DeleteVehicleModelViewStore")
@observer
class DeleteVehicleModel extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.DeleteVehicleModelViewStore.getVehicleModelById(id);
  }
  async onDelete() {
    await this.props.DeleteVehicleModelViewStore.deleteVehicleModel(
      this.props.match.params.id
    );
    if (this.props.DeleteVehicleModelViewStore.isDeleted) {
      this.props.history.push("/vehiclemodel");
    }
  }
  render() {
    const vehicleStore = this.props.DeleteVehicleModelViewStore;

    return (
      <React.Fragment>
        <h1>Click button to delete</h1>

        <button onClick={() => this.onDelete()}>Delete</button>
        {vehicleStore.loading && <h2>Vehicle is deleting...</h2>}
      </React.Fragment>
    );
  }
}

export default DeleteVehicleModel;
