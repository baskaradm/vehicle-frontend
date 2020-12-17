import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Pagination from "../components/VehicleModelPagination";
import VehicleModelFiltering from "../components/VehicleModelFiltering";
import VehicleModelSorting from "../components/VehicleModelSorting";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

@inject("rootStore")
@observer
class VehicleModel extends Component {
  componentDidMount() {
    this.props.rootStore.vehicleModelStore.getVehicleModels();
  }

  render() {
    const vehicleStore = this.props.rootStore.vehicleModelStore;

    if (vehicleStore.loadingVehicles) {
      return <h2>Loading data....</h2>;
    }
    return (
      <div>
        <Nav.Link as={Link} to="/vehiclemodel/create">
          CreateVehicleModel
        </Nav.Link>

        <VehicleModelFiltering />
        <VehicleModelSorting />

        <table cellSpacing="4" cellPadding="2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Abbreviation</th>
              <th>VehicleMakeId</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicleStore.vehicleModels.map((vehicle) => (
              <tr key={vehicle.ID}>
                <td>{vehicle.ID}</td>
                <td>{vehicle.Name}</td>

                <td>{vehicle.Abbreviation}</td>
                <td>{vehicle.VehicleMakeId}</td>
                <td
                  onClick={() =>
                    this.props.history.push(`/vehiclemodel/edit/${vehicle.ID}`)
                  }
                >
                  Edit
                </td>
                <td
                  onClick={() =>
                    this.props.history.push(
                      `/vehiclemodel/delete/${vehicle.ID}`
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

export default VehicleModel;
