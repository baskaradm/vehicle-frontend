import { observable, action, runInAction } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class VehicleModelStore {
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
        this.loadingVehicles = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingVehicles = false;
        this.vehicleError = "Unable to fetch the vehicles";
      })
    }
  }

  @action updatePageNumber(page) {
    this.pagingInfo.pageNumber = page;
  }
}

const vehicleStore = new VehicleModelStore();
export default vehicleStore;
