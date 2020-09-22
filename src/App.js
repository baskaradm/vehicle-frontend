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
        <Route path="/" exact component={Home} />
        <Route exact path="/vehiclemake" component={VehicleMake} />
        <Route path="/vehiclemodel" exact component={VehicleModel} />
        <Route path="/vehiclemake/create" exact component={CreateVehicleMake} />
        <Route path="/vehiclemake/edit/:id" component={EditVehicleMake} />

        <Route
          path="/vehiclemake/delete/:id"
          exact
          component={DeleteVehicleMake}
        />
        <Route
          path="/vehiclemodel/create"
          exact
          component={CreateVehicleModel}
        />
        <Route
          path="/vehiclemodel/edit/:id"
          exact
          component={EditVehicleModel}
        />

        <Route
          path="/vehiclemodel/delete/:id"
          exact
          component={DeleteVehicleModel}
        />
      </Provider>
    </React.Fragment>
  );
}

export default App;
