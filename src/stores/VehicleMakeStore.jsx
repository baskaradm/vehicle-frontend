import { observable, action } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class VehicleMakeStore {
  @observable loading = false;
  @observable loadingVehicles = false;

  @observable vehicleMakes = [];
  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" };

  @observable sortBy = "";
  @observable searchString = "";
  @observable pagingInfo = {
    resultsPerPage: 0,
    totalCount: 0,
    pageNumber: 1,
  };

  @observable isVehicleCreated = false;
  @observable isVehicleUpdated = false;
  @observable isDeleted = false;
  @observable vehicleError = null;

  @action async getVehicleMakes() {
    try {
      this.loadingVehicles = true;
      const results = await vehicleMakeService.getVehicleMakes(
        this.sortBy,
        this.searchString,
        this.pagingInfo.pageNumber
      );

      this.vehicleMakes = results.data.vehicles;

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

  @action async getVehicleMakeById(id) {
    try {
      this.loadingVehicles = true;
      const results = await vehicleMakeService.getVehicleMakeById(id);

      this.vehicle = { ...results.data };
      this.loadingVehicles = false;
    } catch (error) {
      this.loadingVehicles = false;
      this.vehicleError = "Unable to fetch the vehicle";
    }
  }

  @action async createVehicleMake(vehicleMake) {
    try {
      this.loading = true;
      const make = { name: vehicleMake.name, abrv: vehicleMake.abrv };
      await vehicleMakeService.createVehicleMake(make);

      this.isVehicleCreated = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }

  @action async editVehicleMake(vehicleMake, id) {
    try {
      this.loading = true;
      const vehicle = {
        VehicleMakeId: this.vehicle.VehicleMakeId,
        Name: vehicleMake.name,
        Abbreviation: vehicleMake.abrv,
      };
      await vehicleMakeService.editVehicleMake(id, vehicle);

      this.isVehicleUpdated = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }

  @action async deleteVehicleMake(id) {
    try {
      this.loading = true;
      await vehicleMakeService.deleteVehicleMake(id);

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

const vehicleStore = new VehicleMakeStore();
export default vehicleStore;
