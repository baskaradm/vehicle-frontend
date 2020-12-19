import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import EditVehicleMakeValidation from "../common/validation/EditVehicleMakeValidation";
import VehicleMakeForm from "../common/validation/VehicleMakeForm";

@inject("rootStore")
@observer
class EditVehicleMake extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.rootStore.editVehicleMakeViewStore.getVehicleMakeById(id);
  }

  render() {
    return (
      <div>
        <VehicleMakeForm
          form={
            new EditVehicleMakeValidation(
              this.props.rootStore,
              this.props.history,
              this.props.match.params.id
            )
          }
        />
        {this.props.rootStore.editVehicleMakeViewStore.loading && (
          <h2>Vehicle is editing...</h2>
        )}
      </div>
    );
  }
}

export default EditVehicleMake;
