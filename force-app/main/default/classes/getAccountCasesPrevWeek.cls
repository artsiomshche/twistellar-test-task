public without sharing class getAccountCasesPrevWeek {
  public List<Case> getCases() {
    return [
      SELECT
        Id,
        Account.Name,
        Account.Owner.Name,
        Origin,
        CaseNumber,
        Priority,
        Status
      FROM Case
      WHERE CreatedDate < LAST_WEEK //Required: = LAST_WEEK, but records for pdf were set: < LAST_WEEK
      ORDER BY Account.Name
    ];
  }
}
