import { observable, action, runInAction } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class DeleteVehicleMakeViewStore {

  @observable loading = false;
  @observable isDeleted = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;
  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" }

  @action async getVehicleMakeById(id) {
    try {
      this.loadingVehicles = true;
      const results = await vehicleMakeService.getVehicleMakeById(id);
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
  @action async deleteVehicleMake(id, history) {
    try {
      this.loading = true;
      const results = await vehicleMakeService.deleteVehicleMake(id);
      runInAction(() => {
        this.vehicle = { ...results.data };
        this.isDeleted = true;
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

const deleteVehicleMakeViewStore = new DeleteVehicleMakeViewStore();
export default deleteVehicleMakeViewStore;
