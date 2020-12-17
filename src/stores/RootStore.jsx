import VehicleMakeStore from "./VehicleMakeStore";
import CreateVehicleMakeViewStore from "./CreateVehicleMakeViewStore";
import EditVehicleMakeViewStore from "./EditVehicleMakeViewStore";
import DeleteVehicleMakeViewStore from "./DeleteVehicleMakeViewStore";
import VehicleModelStore from "./VehicleModelStore";
import CreateVehicleModelViewStore from "./CreateVehicleModelViewStore";
import EditVehicleModelViewStore from "./EditVehicleModelViewStore";
import DeleteVehicleModelViewStore from "./DeleteVehicleModelViewStore";

class RootStore {
  constructor() {
    this.vehicleMakeStore = new VehicleMakeStore(this);
    this.createVehicleMakeViewStore = new CreateVehicleMakeViewStore(this);
    this.editVehicleMakeViewStore = new EditVehicleMakeViewStore(this);
    this.deleteVehicleMakeViewStore = new DeleteVehicleMakeViewStore(this);
    this.vehicleModelStore = new VehicleModelStore(this);
    this.createVehicleModelViewStore = new CreateVehicleModelViewStore(this);
    this.editVehicleModelViewStore = new EditVehicleModelViewStore(this);
    this.deleteVehicleModelViewStore = new DeleteVehicleModelViewStore(this);
  }
}

export default RootStore;
