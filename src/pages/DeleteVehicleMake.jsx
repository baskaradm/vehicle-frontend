import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("DeleteVehicleMakeViewStore")
@observer
class DeleteVehicleMake extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.DeleteVehicleMakeViewStore.getVehicleMakeById(id);
  }
  async onDelete() {
    await this.props.DeleteVehicleMakeViewStore.deleteVehicleMake(
      this.props.match.params.id
    );
    if (this.props.DeleteVehicleMakeViewStore.isDeleted) {
      this.props.history.push("/vehiclemake");
    }
  }
  render() {
    const vehicleStore = this.props.DeleteVehicleMakeViewStore;

    return (
      <React.Fragment>
        <h1>Click button to delete</h1>

        <button onClick={() => this.onDelete()}>Delete</button>
        {vehicleStore.loading && <h2>Vehicle is deleting...</h2>}
      </React.Fragment>
    );
  }
}

export default DeleteVehicleMake;
