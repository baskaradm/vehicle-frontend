import { observable, action, runInAction } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class CreateVehicleMakeViewStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable loading = false;
  @observable isVehicleCreated = false;
  @observable vehicleError = null;

  @observable vehicleMake = {
    name: "",
    abrv: "",
  };

  @action onChangeHandler(e) {
    this.vehicleMake = { ...this.vehicleMake, [e.target.name]: e.target.value };
  }
  @action async createVehicleMake(formValues, history) {
    try {
      this.loading = true;
      const results = await vehicleMakeService.createVehicleMake(formValues);
      runInAction(() => {
        this.vehicleMake = results.data;
        this.isVehicleCreated = true;

        history.push("/vehiclemake");
      });
    } catch (error) {
      runInAction(() => {
        this.vehicleError = error;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default CreateVehicleMakeViewStore;
