import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import CreateVehicleMakeValidation from "../common/validation/CreateVehicleMakeValidation";
import VehicleMakeForm from "../common/validation/VehicleMakeForm";

@inject("rootStore")
@observer
class CreateVehicleMake extends Component {
  render() {
    return (
      <div>
        <VehicleMakeForm
          form={
            new CreateVehicleMakeValidation(
              this.props.rootStore,
              this.props.history
            )
          }
        />
        {this.props.rootStore.createVehicleMakeViewStore.loading && (
          <h2>Vehicle is creating...</h2>
        )}
      </div>
    );
  }
}

export default CreateVehicleMake;
