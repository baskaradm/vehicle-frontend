import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

class CreateVehicleMakeValidation extends MobxReactForm {
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
          label: "Vehicle Make",
          placeholder: "Vehicle Make",
          rules: "required|string|between:2,25",
        },
        {
          name: "abrv",
          label: "Abrv",
          placeholder: "Abbreviation",
          rules: "required|string|between:1,25",
        },
      ],
    };
  }
  hooks() {
    return {
      onSuccess(form) {
        console.log("Form Values!", form.values());

        this.rootStore.createVehicleMakeViewStore.createVehicleMake(
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

export default CreateVehicleMakeValidation;
