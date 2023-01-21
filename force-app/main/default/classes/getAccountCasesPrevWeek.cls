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
      WHERE CreatedDate < LAST_WEEK
      ORDER BY Account.Name
    ];
  }
}
