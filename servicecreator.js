function createAWSNotificationHandlerService(execlib, ParentService, ntfhandlerlib, awslib, dbopsmixinlib, dbops4notifiermixinlib) {
  'use strict';
  
  var execSuite = execlib.execSuite,
    RemoteServiceListenerServiceMixin = execSuite.RemoteServiceListenerServiceMixin,
    CommunicationNotificationHandlerServiceMixin = ntfhandlerlib.service,
    AWSMailer = awslib.mailer,
    DBOpsUsageServiceMixin = dbopsmixinlib.service,
    DBOpsNotifierServiceMixin = dbops4notifiermixinlib.service;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function AWSNotificationHandlerService(prophash) {
    ParentService.call(this, prophash);
    RemoteServiceListenerServiceMixin.call(this);
    CommunicationNotificationHandlerServiceMixin.call(this, prophash);
    DBOpsUsageServiceMixin.call(this, prophash);
    DBOpsNotifierServiceMixin.call(this);
  }
  
  ParentService.inherit(AWSNotificationHandlerService, factoryCreator);
  RemoteServiceListenerServiceMixin.addMethods(AWSNotificationHandlerService);
  CommunicationNotificationHandlerServiceMixin.addMethods(AWSNotificationHandlerService);
  AWSMailer.addMethodsToNotifier(AWSNotificationHandlerService);
  DBOpsUsageServiceMixin.addMethods(AWSNotificationHandlerService);
  DBOpsNotifierServiceMixin.addMethods(AWSNotificationHandlerService);
  
  AWSNotificationHandlerService.prototype.__cleanUp = function() {
    DBOpsNotifierServiceMixin.prototype.destroy.call(this);
    DBOpsUsageServiceMixin.prototype.destroy.call(this);
    CommunicationNotificationHandlerServiceMixin.prototype.destroy.call(this);
    RemoteServiceListenerServiceMixin.prototype.destroy.call(this);
    ParentService.prototype.__cleanUp.call(this);
  };

  return AWSNotificationHandlerService;
}

module.exports = createAWSNotificationHandlerService;
