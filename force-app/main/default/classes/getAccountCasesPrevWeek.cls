public with sharing class getAccountCasesPrevWeek {
    List<Case> cases;
    public List<Case> getCases() {
        if(cases == null)
            cases = [SELECT Id, Account.Name ,Account.Owner.Name, Origin, CaseNumber, Priority, Status 
                     FROM Case
                     WHERE CreatedDate < THIS_WEEK 
                     ORDER BY Account.Name];
        return cases;
    }
    
}