import { observable, action, runInAction } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class EditVehicleModelViewStore {
  @observable loading = false;
  @observable isVehicleUpdated = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;

  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" }
  @observable vehicleModel = {
    name: "",
    abrv: "",
    vehiclemakeid: "",
  };

  onChangeHandler(e) {
    this.vehicleModel = { ...this.vehicleModel, [e.target.name]: e.target.value };
  }

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

  @action async editVehicleModel(id, history) {
    try {
      this.loading = true;
      const vehicle = {
        VehicleMakeId: this.vehicle.VehicleMakeId,
        Name: this.vehicleModel.name,
        Abbreviation: this.vehicleModel.abrv,
      };
      const results = await vehicleModelService.editVehicleModel(id, vehicle);
      runInAction(() => {
        this.vehicleModel = results.data;
        this.isVehicleUpdated = true;
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

const editVehicleModelViewStore = new EditVehicleModelViewStore();
export default editVehicleModelViewStore;
