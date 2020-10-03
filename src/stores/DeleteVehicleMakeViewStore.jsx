import { observable, action } from "mobx";
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

      this.vehicle = { ...results.data };
      this.loadingVehicles = false;
    } catch (error) {
      this.loadingVehicles = false;
      this.vehicleError = "Unable to fetch the vehicle";
    }
  }



  @action async deleteVehicleMake(id) {
    try {
      this.loading = true;
      await vehicleMakeService.deleteVehicleMake(id);

      this.isDeleted = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }


}

const deleteVehicleMakeViewStore = new DeleteVehicleMakeViewStore();
export default deleteVehicleMakeViewStore;
