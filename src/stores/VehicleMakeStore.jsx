import { observable, action, runInAction } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class VehicleMakeStore {
  @observable loadingVehicles = false;
  @observable vehicleError = null;
  @observable vehicleMakes = [];
  @observable sortBy = "";
  @observable searchString = "";
  @observable pagingInfo = {
    resultsPerPage: 0,
    totalCount: 0,
    pageNumber: 1,
  };

  @action async getVehicleMakes() {
    try {
      this.loadingVehicles = true;
      const results = await vehicleMakeService.getVehicleMakes(
        this.sortBy,
        this.searchString,
        this.pagingInfo.pageNumber
      );
      runInAction(() => {
        this.vehicleMakes = results.data.vehicles;
        this.pagingInfo = {
          resultsPerPage: results.data.pagingInfo.resultsPerPage,
          totalCount: results.data.pagingInfo.totalCount,
          pageNumber: results.data.pagingInfo.pageNumber,
        };
        this.loadingVehicles = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingVehicles = false;
        this.vehicleError = "Unable to fetch the vehicles";
      });

    }
  }

  @action updatePageNumber(page) {
    this.pagingInfo.pageNumber = page;
  }
}

const vehicleStore = new VehicleMakeStore();
export default vehicleStore;
