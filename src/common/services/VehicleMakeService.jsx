import axios from "axios";

class VehicleMakeService {
  getVehicleMakes(sortBy, searchString, pageNumber) {
    return axios.get("api/vehiclemake", {
      params: {
        sortBy: sortBy,
        searchString: searchString,
        page: pageNumber,
      },
    });
  }

  getVehicleMakeById(id) {
    return axios.get(`/api/vehiclemake/${id}`);
  }

  createVehicleMake(vehicleMake) {
    return axios.post("/api/vehiclemake", {
      name: vehicleMake.name,
      abbreviation: vehicleMake.abrv,
    });
  }

  editVehicleMake(id, vehicle) {
    return axios.put(`/api/vehiclemake/${id}`, {
      id: id,

      VehicleMakeId: vehicle.VehicleMakeId,
      Name: vehicle.Name,
      Abbreviation: vehicle.Abbreviation,
    });
  }

  deleteVehicleMake(id) {
    return axios.delete(`/api/vehiclemake/${id}`, {
      id: id,
    });
  }
}
const vehicleMakeService = new VehicleMakeService();
export { vehicleMakeService };
