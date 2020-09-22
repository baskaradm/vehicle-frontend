import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");

@inject("VehicleModelStore")
@observer
class VehicleModelPagination extends Component {
  handlePageChange(pageNumber) {
    this.props.VehicleModelStore.updatePageNumber(pageNumber);
    this.props.VehicleModelStore.getVehicleModels();
  }
  render() {
    const vehicleStore = this.props.VehicleModelStore;
    return (
      <div>
        <Pagination
          activePage={vehicleStore.pagingInfo.pageNumber}
          itemsCountPerPage={vehicleStore.pagingInfo.resultsPerPage}
          totalItemsCount={vehicleStore.pagingInfo.totalCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default VehicleModelPagination;
