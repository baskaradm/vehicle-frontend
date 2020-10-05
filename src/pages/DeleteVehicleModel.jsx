import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("DeleteVehicleModelViewStore")
@observer
class DeleteVehicleModel extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.DeleteVehicleModelViewStore.getVehicleModelById(id);
  }
  render() {
    const vehicleStore = this.props.DeleteVehicleModelViewStore;
    return (
      <React.Fragment>
        <h1>Click button to delete</h1>
        <button onClick={() => this.props.DeleteVehicleModelViewStore.deleteVehicleModel(
          this.props.match.params.id, this.props.history)}>Delete</button>
        {vehicleStore.loading && <h2>Vehicle is deleting...</h2>}
      </React.Fragment>
    );
  }
}

export default DeleteVehicleModel;
