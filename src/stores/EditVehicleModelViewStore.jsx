import { observable, action, runInAction } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class EditVehicleModelViewStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable loading = false;
  @observable isVehicleUpdated = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;

  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" };
  @observable vehicleModel = {
    name: "",
    abrv: "",
    vehiclemakeid: "",
  };

  onChangeHandler(e) {
    this.vehicleModel = {
      ...this.vehicleModel,
      [e.target.name]: e.target.value,
    };
  }

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

export default EditVehicleModelViewStore;
