import { observable, action, runInAction } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class CreateVehicleModelViewStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = false;
  @observable isVehicleCreated = false;
  @observable vehicleError = null;
  @observable vehicleModel = {
    name: "",
    abrv: "",
    vehiclemakeid: "",
  };

  @action onChangeHandler(e) {
    this.vehicleModel = {
      ...this.vehicleModel,
      [e.target.name]: e.target.value,
    };
  }
  @action async createVehicleModel(history) {
    try {
      this.loading = true;
      const results = await vehicleModelService.createVehicleModel(
        this.vehicleModel
      );
      runInAction(() => {
        this.vehicleModel = results.data;
        this.isVehicleCreated = true;
        this.loading = false;
        history.push("/vehiclemodel");
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.vehicleError = error;
      });
    }
  }
}

export default CreateVehicleModelViewStore;
