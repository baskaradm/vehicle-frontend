import React from "react";
import { Provider } from "mobx-react";
import { Route } from "react-router-dom";
import VehicleMakeStore from "./stores/VehicleMakeStore";
import VehicleModelStore from "./stores/VehicleModelStore";
import VehicleMake from "./pages/VehicleMake";
import VehicleModel from "./pages/VehicleModel";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreateVehicleMake from "./pages/CreateVehicleMake";
import EditVehicleMake from "./pages/EditVehicleMake";
import DeleteVehicleMake from "./pages/DeleteVehicleMake";
import CreateVehicleModel from "./pages/CreateVehicleModel";
import EditVehicleModel from "./pages/EditVehicleModel";
import DeleteVehicleModel from "./pages/DeleteVehicleModel";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Provider
        VehicleMakeStore={VehicleMakeStore}
        VehicleModelStore={VehicleModelStore}
      >
        <Route exact path="/" component={Home} />
        <Route path="/vehiclemake" exact component={VehicleMake} />
        <Route path="/vehiclemodel" exact component={VehicleModel} />
        <Route path="/vehiclemake/create" component={CreateVehicleMake} />
        <Route path="/vehiclemake/edit/:id" component={EditVehicleMake} />

        <Route path="/vehiclemake/delete/:id" component={DeleteVehicleMake} />
        <Route path="/vehiclemodel/create" component={CreateVehicleModel} />
        <Route path="/vehiclemodel/edit/:id" component={EditVehicleModel} />

        <Route path="/vehiclemodel/delete/:id" component={DeleteVehicleModel} />
      </Provider>
    </React.Fragment>
  );
}

export default App;
