import { observable, action, runInAction } from "mobx";
import { vehicleMakeService } from "../common/services/VehicleMakeService";

class EditVehicleMakeViewStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable loading = false;
  @observable isVehicleUpdated = false;
  @observable vehicleError = null;
  @observable loadingVehicles = false;
  @observable vehicle = { VehicleMakeId: null, Name: "", Abbreviation: "" };

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

export default EditVehicleMakeViewStore;
