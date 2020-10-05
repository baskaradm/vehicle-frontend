import { observable, action, runInAction } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class DeleteVehicleModelViewStore {
  @observable loading = false;
  @observable isDeleted = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;
  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" }

  @action async getVehicleModelById(id) {
    try {
      this.loadingVehicles = true;
      const results = await vehicleModelService.getVehicleModelById(id);
      runInAction(() => {
        this.vehicle = { ...results.data };
        this.loadingVehicles = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingVehicles = false;
        this.vehicleError = "Unable to fetch the vehicle";
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
        this.loading = false;
        history.push("/vehiclemodel")
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.vehicleError = error;
      });
    }
  }
}

const deleteVehicleModelViewStore = new DeleteVehicleModelViewStore();
export default deleteVehicleModelViewStore;
