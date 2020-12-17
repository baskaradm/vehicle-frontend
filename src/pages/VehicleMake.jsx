import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Pagination from "../components/VehicleMakePagination";
import VehicleMakeFiltering from "../components/VehicleMakeFiltering";
import VehicleMakeSorting from "../components/VehicleMakeSorting";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

@inject("rootStore")
@observer
class VehicleMake extends Component {
  componentDidMount() {
    this.props.rootStore.vehicleMakeStore.getVehicleMakes();
  }

  render() {
    const vehicleStore = this.props.rootStore.vehicleMakeStore;
    if (vehicleStore.loadingVehicles) {
      return <h2>Loading data....</h2>;
    }
    return (
      <div>
        <Nav.Link as={Link} to="/vehiclemake/create">
          CreateVehicleMake
        </Nav.Link>

        <VehicleMakeFiltering />
        <VehicleMakeSorting />
        <table cellSpacing="4" cellPadding="2">
          <thead>
            <tr>
              <th>Name</th>
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
        <Pagination />
      </div>
    );
  }
}

export default VehicleMake;
