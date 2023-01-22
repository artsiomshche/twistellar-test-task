import { LightningElement, wire, track } from "lwc";
import getUserCases from "@salesforce/apex/ServiceCaseQueueService.getUserCases";
import updateCaseStatus from "@salesforce/apex/ServiceCaseQueueService.updateCaseStatus";
import { getPicklistValues, getObjectInfo } from "lightning/uiObjectInfoApi";
import constants from "./constants";
import CASE_OBJECT from "@salesforce/schema/Case";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LightningDataTable extends LightningElement {
  @track availableCases = [];
  @track statusOptions = [];
  @track isLoading = false;
  wiredCases = [];
  recordTypeId;
  columns = constants.COLUMNS;

  @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
  handleResult({ error, data }) {
    if (data) {
      this.recordTypeId = data.defaultRecordTypeId;
    } else {
      console.log("Get object info Error: " + JSON.stringify(error));
    }
  }

  @wire(getPicklistValues, {
    recordTypeId: "$recordTypeId",
    fieldApiName: STATUS_FIELD
  })
  wiredPicklistValues({ error, data }) {
    if (data) {
      this.statusOptions = data.values;
      this.getUserCases();
    } else {
      console.log("Get picklist values Error: " + JSON.stringify(error));
    }
  }

  getUserCases() {
    this.isLoading = true;
    getUserCases()
      .then((result) => {
        let tempRecs = [];
        result.forEach((record) => {
          let tempRec = Object.assign({}, record);
          tempRec.caseURL = `/lightning/r/Case/${tempRec.Id}/view`;
          tempRec.picklistOptions = this.statusOptions;
          tempRec.OwnerName = record.Owner.Name;
          tempRecs.push(tempRec);
        });
        this.availableCases = tempRecs;
      })
      .catch((error) => {
        this.displayMessage(
          "Error!",
          "An error occured when loading cases " + error?.body?.message,
          "error"
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  handleRefreshButton() {
    this.getUserCases();
  }

  async handleChangeStatus(event) {
    let { context, value } = event.detail.data;
    if (context && value) {
      this.isLoading = true;
      try {
        await updateCaseStatus({ caseId: context, status: value });
        this.displayMessage(
          "Success!",
          `The record status has been changed to "${value}"`,
          "success"
        );
      } catch (error) {
        this.displayMessage(
          "Error!",
          error.body.message ? error.body.message : "Unknown error.",
          "error",
          "sticky"
        );
      } finally {
        this.isLoading = false;
      }
    }
  }

  displayMessage(title, message, variant, mode = "dismissable") {
    const toastEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
      mode: mode
    });
    this.dispatchEvent(toastEvent);
  }
}
