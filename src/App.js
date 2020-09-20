import React from "react";
import { Provider } from "mobx-react";
import { Route } from "react-router-dom";
import VehicleMakeStore from "./stores/VehicleMakeStore";
import VehicleMake from "./pages/VehicleMake";
import VehicleModel from "./pages/VehicleModel";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreateVehicleMake from "./pages/CreateVehicleMake";
import EditVehicleMake from "./pages/EditVehicleMake";
import DeleteVehicleMake from "./pages/DeleteVehicleMake";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Provider VehicleMakeStore={VehicleMakeStore}>
        <Route path="/" exact component={Home} />
        <Route exact path="/vehiclemake" component={VehicleMake} />
        <Route path="/vehiclemake/create" exact component={CreateVehicleMake} />
        <Route path="/vehiclemake/edit/:id" component={EditVehicleMake} />
        <Route
          path="/vehiclemake/delete/:id"
          exact
          component={DeleteVehicleMake}
        />
      </Provider>
      <Route path="/vehiclemodel" exact component={VehicleModel} />
    </React.Fragment>
  );
}

export default App;
