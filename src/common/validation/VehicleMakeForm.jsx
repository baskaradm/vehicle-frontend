import React from "react";
import { observer } from "mobx-react";

export default observer(({ form }) => (
  <form onSubmit={form.onSubmit}>
    <label htmlFor={form.$("name").id}>{form.$("name").label}</label>
    <input {...form.$("name").bind({ type: "text", placeholder: null })} />
    <p>{form.$("name").error}</p>

    <label htmlFor={form.$("abrv").id}>{form.$("abrv").label}</label>
    <input {...form.$("abrv").bind({ type: "text", placeholder: null })} />
    <p>{form.$("abrv").error}</p>
    {/* ... other inputs ... */}

    <button type="submit" onClick={form.onSubmit}>
      Submit
    </button>
    <button type="button" onClick={form.onClear}>
      Clear
    </button>

    <p>{form.error}</p>
  </form>
));
