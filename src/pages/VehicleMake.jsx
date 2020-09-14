import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("VehicleMakeStore")
@observer
class VehicleMake extends Component {
  componentDidMount() {
    this.props.VehicleMakeStore.getVehicleMakes();
  }

  render() {
    const vehicleStore = this.props.VehicleMakeStore;
    if (vehicleStore.loadingVehicles) {
      return <h2>Loading data....</h2>;
    }
    return (
      <div>
        <table cellSpacing="4" cellPadding="6">
          <thead>
            <tr>
              <th style={{ float: "left" }}>Name</th>
              <th>Abbreviation</th>
              <th>VehicleMakeId</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicleStore.vehicleMakes.map((vehicle) => (
              <tr key={vehicle.VehicleMakeId}>
                <td>{vehicle.Name}</td>
                <td>{vehicle.Abbreviation}</td>
                <td>{vehicle.VehicleMakeId}</td>

                <td
                  onClick={() =>
                    this.props.history.push(
                      `/vehiclemake/edit/${vehicle.VehicleMakeId}`
                    )
                  }
                >
                  Edit
                </td>

                <td
                  onClick={() =>
                    this.props.history.push(
                      `/vehiclemake/delete/${vehicle.VehicleMakeId}`
                    )
                  }
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default VehicleMake;
