import { observable, action } from "mobx";
import axios from "axios";

class VehicleModelStore {
  @observable vehicleModels = [];
  @observable sortBy = "";
  @observable searchString = "";
  @observable page = 1;
  @observable loading = false;
  @observable loadingVehicles = false;
  @observable isVehicleCreated = false;
  @observable isVehicleUpdated = false;
  @observable vehicleError = null;
  @observable isDeleted = false;
  @observable pagingInfo = {
    resultsPerPage: 0,
    totalCount: 0,
    pageNumber: 1,
  };
  @observable vehicle = {
    VehicleMakeId: "",
    Name: "",
    Abbreviation: "",
  };

  @action async getVehicleModels() {
    try {
      this.loadingVehicles = true;
      const results = await axios.get("api/vehiclemodel", {
        params: {
          sortBy: this.sortBy,
          searchString: this.searchString,
          page: this.pagingInfo.pageNumber,
        },
      });

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
      const results = await axios.get(`/api/vehiclemodel/${id}`);

      this.vehicle = { ...results.data };

      this.loadingVehicles = false;
    } catch (error) {
      this.loadingVehicles = false;
      this.vehicleError = "Unable to fetch the vehicle";
    }
  }
  @action async createVehicleModel(vehicleModel) {
    try {
      this.loading = true;

      await axios.post("/api/vehiclemodel", {
        vehiclemakeid: vehicleModel.vehiclemakeid,
        name: vehicleModel.name,
        abbreviation: vehicleModel.abrv,
      });

      this.isVehicleCreated = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }
  @action async editVehicleModel(vehicleModel, id) {
    try {
      this.loading = true;
      await axios.put(`/api/vehiclemodel/${id}`, {
        id: id,

        vehiclemakeid: vehicleModel.vehiclemakeid,
        Name: vehicleModel.name,
        Abbreviation: vehicleModel.abrv,
      });

      this.isVehicleUpdated = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }
  @action async deleteVehicleModel(id) {
    try {
      this.loading = true;
      await axios.delete(`/api/vehiclemodel/${id}`, {
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

const vehicleStore = new VehicleModelStore();
export default vehicleStore;
