import { observable, action, runInAction } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class EditVehicleMakeViewStore {
  @observable loading = false;
  @observable isVehicleUpdated = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;
  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" }

  @observable vehicleMake = {
    name: "",
    abrv: "",
  };

  onChangeHandler(e) {
    this.vehicleMake = { ...this.vehicleMake, [e.target.name]: e.target.value };
  }

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

  @action async editVehicleMake(id, history) {
    try {
      this.loading = true;
      const vehicle = {
        VehicleMakeId: this.vehicle.VehicleMakeId,
        Name: this.vehicleMake.name,
        Abbreviation: this.vehicleMake.abrv,
      };
      const results = await vehicleMakeService.editVehicleMake(id, vehicle);
      runInAction(() => {
        this.vehicleMake = results.data;
        this.isVehicleUpdated = true;
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

const editVehicleMakeViewStore = new EditVehicleMakeViewStore();
export default editVehicleMakeViewStore;
