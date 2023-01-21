import LightningDatatable from "lightning/datatable";
import customPicklist from "./customPicklist.html";

export default class CustomTypesGlobal extends LightningDatatable {
  static customTypes = {
    priorityPicklist: {
      template: customPicklist,
      standardCellLayout: true,
      typeAttributes: ["label", "value", "placeholder", "options", "context"]
    }
  };
}
