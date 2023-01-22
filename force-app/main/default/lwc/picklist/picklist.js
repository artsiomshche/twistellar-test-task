import { LightningElement, api } from "lwc";

export default class PicklistDemo extends LightningElement {
  @api context;
  @api value;
  @api name;
  @api label;
  @api placeholder;
  @api options;

  handleChange(event) {
    // eslint-disable-next-line @lwc/lwc/no-api-reassignments
    this.value = event.detail.value;

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
