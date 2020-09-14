import { observable, action } from "mobx";
import axios from "axios";

class VehicleModelStore {
  @observable vehicleModels = [];
  @observable sortBy = "";
  @observable searchString = "";
  @observable page = 1;

  @action async getVehicleModels() {
    const results = await axios.get("api/vehiclemodel", {
      params: {
        sortBy: this.sortBy,
        searchString: this.searchString,
        page: this.page,
      },
    });

    this.vehicleModels = results.data.vehicles;
  }
}
const vehicleStore = new VehicleModelStore();
export default vehicleStore;
