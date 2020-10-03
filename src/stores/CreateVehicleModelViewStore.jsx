import { observable, action } from "mobx";
import { vehicleModelService } from "../common/services/VehicleModelService";

class CreateVehicleModelViewStore {
  @observable loading = false;
  @observable isVehicleCreated = false;
  @observable vehicleError = null;


  @observable vehicleModel = {
    name: "",
    abrv: "",
    vehiclemakeid: "",
  };

  @action onChangeHandler(e) {
    this.vehicleModel = { ...this.vehicleModel, [e.target.name]: e.target.value };
  }
  @action async createVehicleModel(vehicleModel) {
    try {
      this.loading = true;
      const model = { name: vehicleModel.name, abrv: vehicleModel.abrv, vehiclemakeid: vehicleModel.vehiclemakeid };
      await vehicleModelService.createVehicleModel(model);

      this.isVehicleCreated = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.vehicleError = error;
    }
  }
}
const createVehicleModelViewStore = new CreateVehicleModelViewStore();
export default createVehicleModelViewStore;
