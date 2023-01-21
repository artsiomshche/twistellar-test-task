const COLUMNS = [
  {
    label: "CaseNumber",
    fieldName: "caseURL",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "CaseNumber"
      },
      target: "_blank"
    }
  },
  {
    label: "Owner Name",
    type: "text",
    fieldName: "OwnerName",
    typeAttributes: {
      fields: ["Owner.Name"]
    }
  },
  {
    label: "Origin",
    fieldName: "Origin",
    type: "text"
  },
  {
    label: "Status",
    fieldName: "Priority",
    type: "priorityPicklist",
    wrapText: true,
    typeAttributes: {
      options: { fieldName: "picklistOptions" },
      context: { fieldName: "Id" },
      value: { fieldName: "Status" },
      placeholder: "--Select--"
    }
  },
  {
    label: "Priority",
    fieldName: "Priority",
    type: "text"
  },
  {
    label: "Created Date",
    fieldName: "CreatedDate",
    type: "date",
    typeAttributes: {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }
  }
];

export default Object.assign({
  COLUMNS
});
