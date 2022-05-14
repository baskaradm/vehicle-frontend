import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import RootStore from "./stores/RootStore";
const rootStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider
        rootStore={rootStore}
        VehicleMakeStore={rootStore.vehicleMakeStore}
        CreateVehicleMakeViewStore={rootStore.createVehicleMakeViewStore}
        EditVehicleMakeViewStore={rootStore.editVehicleMakeViewStore}
        DeleteVehicleMakeViewStore={rootStore.deleteVehicleMakeViewStore}
        VehicleModelStore={rootStore.vehicleModelStore}
        CreateVehicleModelViewStore={rootStore.createVehicleModelViewStore}
        EditVehicleModelViewStore={rootStore.editVehicleModelViewStore}
        DeleteVehicleModelViewStore={rootStore.deleteVehicleModelViewStore}
      >
        {" "}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
