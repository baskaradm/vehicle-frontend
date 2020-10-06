import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Badge } from "react-bootstrap";

@inject("VehicleModelStore")
@observer
class VehicleModelSorting extends Component {
  onSortingChange(sortBy) {
    this.props.VehicleModelStore.sortBy = sortBy;
    this.props.VehicleModelStore.getVehicleModels();
  }
  render() {
    return (
      <div>
        Sort by:{" "}
        <Badge pill onClick={() => this.onSortingChange("name_desc")}>
          Name
        </Badge>{" "}
        <Badge pill onClick={() => this.onSortingChange("abrv")}>
          Abrv
        </Badge>{" "}
        <Badge onClick={() => this.onSortingChange("abrv_desc")}>
          Abrv_Desc
        </Badge>{" "}
        <Badge onClick={() => this.onSortingChange("VehicleMakeId")}>
          VehicleMakeId
        </Badge>
        <Badge onClick={() => this.onSortingChange("vehiclemakeid_desc")}>
          VehicleMakeId_Desc
        </Badge>
        <Badge onClick={() => this.onSortingChange("")}>Default</Badge>
      </div>
    );
  }
}

export default VehicleModelSorting;
