'use strict';

module.exports = function(Traffic) {
  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  Traffic.CheckCar = function(plateNumber, cb) {
    Traffic.CheckCar(plateNumber, cb);
    //   function(err, response) {
    //   var result = response;
    //   cb(err, result);
    // });
  };

  // Map to REST/HTTP
  Traffic.remoteMethod(
      'CheckCar', {
        accepts: [
          {arg: 'plateNumber', type: 'string', required: true},
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'post', path: '/CheckCar'},
      }
  );
};
