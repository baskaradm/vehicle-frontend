import { observable, action } from "mobx";
import axios from "axios";

class VehicleMakeStore {
  @observable loading = false;
  @observable loadingVehicles = false;
  @observable vehicleMakes = [];
  @observable sortBy = "";
  @observable searchString = "";
  @observable isVehicleCreated = false;
  @observable isVehicleUpdated = false;
  @observable vehicleError = null;
  @observable isDeleted = false;
  @observable pagingInfo = {
    resultsPerPage: 0,
    totalCount: 0,
    pageNumber: 1,
  };

  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" };

  @action async getVehicleMakes() {
    try {
      this.loadingVehicles = true;
      const results = await axios.get("api/vehiclemake", {
        params: {
          sortBy: this.sortBy,
          searchString: this.searchString,
          page: this.pagingInfo.pageNumber,
        },
      });

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
      const results = await axios.get(`/api/vehiclemake/${id}`);

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
      await axios.post("/api/vehiclemake", {
        name: vehicleMake.name,
        abbreviation: vehicleMake.abrv,
      });

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
      await axios.put(`/api/vehiclemake/${id}`, {
        id: id,

        VehicleMakeId: this.vehicle.VehicleMakeId,
        Name: vehicleMake.name,
        Abbreviation: vehicleMake.abrv,
      });

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
      await axios.delete(`/api/vehiclemake/${id}`, {
        id: id,
      });

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
