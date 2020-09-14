import { observable, action } from "mobx";
import axios from "axios";

class VehicleMakeStore {
  @observable loading = false;
  @observable loadingVehicles = false;
  @observable vehicleMakes = [];
  @observable sortBy = "";
  @observable searchString = "";
  @observable page = 1;
  @observable isVehicleCreated = false;
  @observable isVehicleUpdated = false;
  @observable vehicleError = null;
  @observable isDeleted = false;

  @observable vehicle = { vehicleMakeid: null, Name: "", Abbreviation: "" };

  @action async getVehicleMakes() {
    try {
      this.loadingVehicles = true;
      const results = await axios.get("api/vehiclemake", {
        params: {
          sortBy: this.sortBy,
          searchString: this.searchString,
          page: this.page,
        },
      });

      //console.log(results);
      this.vehicleMakes = results.data.vehicles;
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
      const results = await axios.post("/api/vehiclemake", {
        name: vehicleMake.name,
        abbreviation: vehicleMake.abrv,
      });

      console.log(results);
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
      const results = await axios.put(`/api/vehiclemake/${id}`, {
        id: id,

        VehicleMakeId: this.vehicle.VehicleMakeId,
        Name: vehicleMake.name,
        Abbreviation: vehicleMake.abrv,
      });
      console.log(results);
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
      const results = await axios.delete(`/api/vehiclemake/${id}`, {
        id: id,
      });
      this.isDeleted = true;
      console.log(results);
      this.loading = false;
    } catch (error) {
      this.loading = false;

      this.vehicleError = error;
    }
  }
}

const vehicleStore = new VehicleMakeStore();
export default vehicleStore;
