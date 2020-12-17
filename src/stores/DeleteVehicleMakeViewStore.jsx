import { observable, action, runInAction } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class DeleteVehicleMakeViewStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = false;
  @observable isDeleted = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;
  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" };

  @action async getVehicleMakeById(id) {
    try {
      this.loadingVehicles = true;
      const results = await vehicleMakeService.getVehicleMakeById(id);
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
  @action async deleteVehicleMake(id, history) {
    try {
      this.loading = true;
      const results = await vehicleMakeService.deleteVehicleMake(id);
      runInAction(() => {
        this.vehicle = { ...results.data };
        this.isDeleted = true;
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

export default DeleteVehicleMakeViewStore;
