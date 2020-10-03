import { observable, action } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class CreateVehicleMakeViewStore {
  @observable loading = false;
  @observable isVehicleCreated = false;
  @observable vehicleError = null;


  @observable vehicleMake = {
    name: "",
    abrv: ""
  };

  @action onChangeHandler(e) {
    this.vehicleMake = { ...this.vehicleMake, [e.target.name]: e.target.value };
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
}
const createVehicleMakeViewStore = new CreateVehicleMakeViewStore();
export default createVehicleMakeViewStore;
