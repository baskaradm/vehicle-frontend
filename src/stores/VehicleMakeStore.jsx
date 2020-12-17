import { observable, action, runInAction } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class VehicleMakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
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
      });
    } catch (error) {
      runInAction(() => {
        this.vehicleError = "Unable to fetch the vehicles";
      });
    } finally {
      runInAction(() => {
        this.loadingVehicles = false;
      });
    }
  }

  @action updatePageNumber(page) {
    this.pagingInfo.pageNumber = page;
  }
}

export default VehicleMakeStore;
