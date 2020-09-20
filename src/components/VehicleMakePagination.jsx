import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");

@inject("VehicleMakeStore")
@observer
class VehicleMakePagination extends Component {
  handlePageChange(pageNumber) {
    this.props.VehicleMakeStore.updatePageNumber(pageNumber);
    this.props.VehicleMakeStore.getVehicleMakes();
  }
  render() {
    const vehicleStore = this.props.VehicleMakeStore;
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

export default VehicleMakePagination;
