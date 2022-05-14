import { observable, action, runInAction } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class VehicleModelStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable vehicleModels = [];
  @observable sortBy = "";
  @observable searchString = "";
  @observable page = 1;

  @observable pagingInfo = {
    resultsPerPage: 0,
    totalCount: 0,
    pageNumber: 1,
  };
  @observable loadingVehicles = false;
  @observable vehicleError = null;

  @action async getVehicleModels() {
    try {
      this.loadingVehicles = true;
      const results = await vehicleModelService.getVehicleModels(
        this.sortBy,
        this.searchString,
        this.pagingInfo.pageNumber
      );
      runInAction(() => {
        this.vehicleModels = results.data.vehicles;
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

export default VehicleModelStore;
