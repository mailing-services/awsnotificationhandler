function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex:httpexecutor',
        'communication:notificationhandlermixin:lib',
        'mailing:aws:lib',
        'communication:dbopsmixin:lib',
        'communication:dbops4notifiermixin:lib'
      ]
    },
    sinkmap: {
      dependencies: ['allex:httpexecutor']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;
