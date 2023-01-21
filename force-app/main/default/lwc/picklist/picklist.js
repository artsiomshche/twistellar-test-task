import { LightningElement, api } from "lwc";

export default class PicklistDemo extends LightningElement {
  @api context;
  @api value;
  @api name;
  @api label;
  @api placeholder;
  @api options;

  handleChange(event) {
    //show the selected value on UI

    // eslint-disable-next-line @lwc/lwc/no-api-reassignments
    this.value = event.detail.value;

    //fire event to send context and selected value to the data table
    this.dispatchEvent(
      new CustomEvent("picklistchanged", {
        composed: true,
        bubbles: true,
        cancelable: true,
        detail: {
          data: { context: this.context, value: this.value }
        }
      })
    );
  }
}
