import { observable, action } from "mobx";
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

      this.vehicle = { ...results.data };
      this.loadingVehicles = false;
    } catch (error) {
      this.loadingVehicles = false;
      this.vehicleError = "Unable to fetch the vehicle";
    }
  }



  @action async deleteVehicleModel(id) {
    try {
      this.loading = true;
      await vehicleModelService.deleteVehicleModel(id);

      this.isDeleted = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }


}

const deleteVehicleModelViewStore = new DeleteVehicleModelViewStore();
export default deleteVehicleModelViewStore;
