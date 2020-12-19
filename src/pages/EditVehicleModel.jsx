import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import EditVehicleModelValidation from "../common/validation/EditVehicleModelValidation";
import VehicleModelForm from "../common/validation/VehicleModelForm";

@inject("rootStore")
@observer
class EditVehicleModel extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.rootStore.editVehicleModelViewStore.getVehicleModelById(id);
  }
  render() {
    return (
      <div>
        <VehicleModelForm
          form={
            new EditVehicleModelValidation(
              this.props.rootStore,
              this.props.history,
              this.props.match.params.id
            )
          }
        />
        {this.props.rootStore.editVehicleModelViewStore.loading && (
          <h2>Vehicle is editing...</h2>
        )}
      </div>
    );
  }
}

export default EditVehicleModel;
