import { observable, action, runInAction } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class DeleteVehicleModelViewStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable loading = false;
  @observable isDeleted = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;
  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" };

  @action async getVehicleModelById(id) {
    try {
      this.loadingVehicles = true;
      const results = await vehicleModelService.getVehicleModelById(id);
      runInAction(() => {
        this.vehicle = { ...results.data };
      });
    } catch (error) {
      runInAction(() => {
        this.vehicleError = "Unable to fetch the vehicle";
      });
    } finally {
      runInAction(() => {
        this.loadingVehicles = false;
      });
    }
  }

  @action async deleteVehicleModel(id, history) {
    try {
      this.loading = true;
      const results = await vehicleModelService.deleteVehicleModel(id);
      runInAction(() => {
        this.vehicle = { ...results.data };
        this.isDeleted = true;
        history.push("/vehiclemodel");
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

export default DeleteVehicleModelViewStore;
