import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import CreateVehicleModelValidation from "../common/validation/CreateVehicleModelValidation";
import VehicleModelForm from "../common/validation/VehicleModelForm";

@inject("rootStore")
@observer
class CreateVehicleModel extends Component {
  render() {
    return (
      <div>
        <VehicleModelForm
          form={
            new CreateVehicleModelValidation(
              this.props.rootStore,
              this.props.history
            )
          }
        />
        {this.props.rootStore.createVehicleModelViewStore.loading && (
          <h2>Vehicle is creating...</h2>
        )}
      </div>
    );
  }
}

export default CreateVehicleModel;
