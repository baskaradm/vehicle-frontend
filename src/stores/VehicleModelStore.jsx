import { observable, action } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class VehicleModelStore {
  @observable vehicleModels = [];

  @observable vehicle = {
    VehicleMakeId: "",
    Name: "",
    Abbreviation: "",
  };

  @observable sortBy = "";
  @observable searchString = "";
  @observable page = 1;

  @observable pagingInfo = {
    resultsPerPage: 0,
    totalCount: 0,
    pageNumber: 1,
  };

  @observable loading = false;
  @observable loadingVehicles = false;



  @observable vehicleError = null;
  @observable isDeleted = false;

  @action async getVehicleModels() {
    try {
      this.loadingVehicles = true;

      const results = await vehicleModelService.getVehicleModels(
        this.sortBy,
        this.searchString,
        this.pagingInfo.pageNumber
      );

      this.vehicleModels = results.data.vehicles;

      this.pagingInfo = {
        resultsPerPage: results.data.pagingInfo.resultsPerPage,
        totalCount: results.data.pagingInfo.totalCount,
        pageNumber: results.data.pagingInfo.pageNumber,
      };

      this.loadingVehicles = false;
    } catch (error) {
      this.loadingVehicles = false;
      this.vehicleError = "Unable to fetch the vehicles";
    }
  }

  @action async getVehicleModelById(id) {
    try {
      this.loadingVehicles = true;

      const results = await vehicleModelService.getVehicleModelById(id);

      this.vehicle = { ...results.data };

      this.loadingVehicles = false;
    } catch (error) {
      this.loadingVehicles = false;
      this.vehicleError = "Unable to fetch the vehicle";
    }
  }




  @action async deleteVehicleModel(id) {
    try {
      this.loading = true;
      await vehicleModelService.deleteVehicleModel(id);

      this.isDeleted = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }

  @action updatePageNumber(page) {
    this.pagingInfo.pageNumber = page;
  }
}

const vehicleStore = new VehicleModelStore();
export default vehicleStore;
