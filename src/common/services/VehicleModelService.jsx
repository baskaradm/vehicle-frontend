import axios from "axios";

class VehicleModelService {
  getVehicleModels(sortBy, searchString, pageNumber) {
    return axios.get("api/vehiclemodel", {
      params: {
        sortBy: sortBy,
        searchString: searchString,
        page: pageNumber,
      },
    });
  }

  getVehicleModelById(id) {
    return axios.get(`/api/vehiclemodel/${id}`);
  }

  createVehicleModel(vehicleModel) {
    return axios.post("/api/vehiclemodel", {
      name: vehicleModel.name,
      abbreviation: vehicleModel.abrv,
      vehiclemakeid: vehicleModel.vehiclemakeid,
    });
  }

  editVehicleModel(id, vehicle) {
    return axios.put(`/api/vehiclemodel/${id}`, {
      id: id,

      VehicleMakeId: vehicle.VehicleMakeId,
      Name: vehicle.Name,
      Abbreviation: vehicle.Abbreviation,
    });
  }

  deleteVehicleModel(id) {
    return axios.delete(`/api/vehiclemodel/${id}`, {
      id: id,
    });
  }
}
const vehicleModelService = new VehicleModelService();
export { vehicleModelService };
