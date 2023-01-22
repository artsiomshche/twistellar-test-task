public inherited sharing class ServiceCaseQueueService {
  private static final String TYPE_QUEUE = 'Queue';
  @AuraEnabled
  public static List<Case> getUserCases() {
    String userId = UserInfo.getUserId();
    List<Id> queueIds = getQueueIdsByUserId(userId);
    String query = buildQuery();
    return Database.query(query);
  }

  private static String buildQuery() {
    String query = 'SELECT Id, Origin, CaseNumber, Priority, Status, OwnerId, Owner.Name, CreatedDate FROM Case WHERE ';
    query += ' OwnerId = :userId OR OwnerId IN :queueIds';
    query += ' ORDER BY Priority, CreatedDate DESC LIMIT 25';
    return query;
  }

  @AuraEnabled
  public static void updateCaseStatus(String caseId, String status) {
    try {
      Case toUpdateCase = new Case(Id = caseId, Status = status);
      Database.SaveResult result = Database.update(toUpdateCase, false);
    } catch (Exception ex) {
      throw new AuraHandledException('Main issue. ' + ex.getMessage());
    }
  }

  public static List<Id> getQueueIdsByUserId(String userId) {
    List<GroupMember> queues = getQueues(userId);
    List<Id> queueList = new List<Id>();
    for (GroupMember memberQueue : queues) {
      queueList.add(memberQueue.GroupId);
    }
    return queueList;
  }

  private static List<GroupMember> getQueues(String userId) {
    return [
      SELECT Group.Id
      FROM GroupMember
      WHERE
        GroupId IN (SELECT Id FROM Group WHERE type = :TYPE_QUEUE)
        AND UserOrGroupId = :userId
    ];
  }
}
