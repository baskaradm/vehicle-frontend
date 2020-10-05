import { observable, action, runInAction } from "mobx";
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
  @action async createVehicleMake(history) {
    try {
      this.loading = true;
      const results = await vehicleMakeService.createVehicleMake(this.vehicleMake);
      runInAction(() => {
        this.vehicleMake = results.data;
        this.isVehicleCreated = true;
        this.loading = false;
        history.push("/vehiclemake")
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.vehicleError = error;
      });
    }
  }
}
const createVehicleMakeViewStore = new CreateVehicleMakeViewStore();
export default createVehicleMakeViewStore;
