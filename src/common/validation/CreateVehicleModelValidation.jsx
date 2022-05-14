import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class CreateVehicleModelValidation extends MobxReactForm {
  constructor(rootStore, history) {
    super();
    this.rootStore = rootStore;
    this.history = history;
  }
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }
  setup() {
    return {
      fields: [
        {
          name: "name",
          label: "Vehicle Model",
          placeholder: "Vehicle Model",
          rules: "required|string|between:2,25",
        },
        {
          name: "abrv",
          label: "Abrv",
          placeholder: "Abbreviation",
          rules: "required|string|between:1,25",
        },
        {
          name: "vehiclemakeid",
          label: "Vehicle Make Id",
          placeholder: "Vehicle Make Id",
          rules: "required|integer|between:1,100",
        },
      ],
    };
  }
  hooks() {
    return {
      onSuccess(form) {
        console.log("Form Values!", form.values());

        this.rootStore.createVehicleModelViewStore.createVehicleModel(
          form.values(),
          this.history
        );
      },
      onError(form) {
        alert("Form has errors!");
        console.log("All form errors", form.errors());
      },
    };
  }
}

export default CreateVehicleModelValidation;
