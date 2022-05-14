import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Badge } from "react-bootstrap";

@inject("VehicleMakeStore")
@observer
class VehicleMakeSorting extends Component {
  onSortingChange(sortBy) {
    this.props.VehicleMakeStore.sortBy = sortBy;
    this.props.VehicleMakeStore.getVehicleMakes();
  }
  render() {
    return (
      <div>
        Sort by:{" "}
        <Badge
          pill
          color="primary"
          onClick={() => this.onSortingChange("name_desc")}
        >
          Name
        </Badge>{" "}
        <Badge
          pill
          variant="primary"
          onClick={() => this.onSortingChange("abrv")}
        >
          Abrv
        </Badge>{" "}
        <Badge onClick={() => this.onSortingChange("abrv_desc")}>
          Abrv_Desc
        </Badge>{" "}
        <Badge onClick={() => this.onSortingChange("")}>Default</Badge>
      </div>
    );
  }
}

export default VehicleMakeSorting;
