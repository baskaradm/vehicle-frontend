import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("rootStore")
@observer
class DeleteVehicleModel extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.rootStore.deleteVehicleModelViewStore.getVehicleModelById(id);
  }
  render() {
    const vehicleStore = this.props.rootStore.deleteVehicleModelViewStore;
    return (
      <React.Fragment>
        <h1>Click button to delete</h1>
        <button
          onClick={() =>
            this.props.rootStore.deleteVehicleModelViewStore.deleteVehicleModel(
              this.props.match.params.id,
              this.props.history
            )
          }
        >
          Delete
        </button>
        {vehicleStore.loading && <h2>Vehicle is deleting...</h2>}
      </React.Fragment>
    );
  }
}

export default DeleteVehicleModel;
