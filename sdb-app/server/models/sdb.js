'use strict';

module.exports = function(Traffic) {
  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  Traffic.GetPlateNumber = function(nationalId, cb) {
    console.log({nationalId});
    console.log('kkkkkk;k');
    Traffic.GetPlateNumber(nationalId, function(err, response) {
      var result = response;
      console.log('kkkkkkk');
      cb(err, result);
    });
  };

  // Map to REST/HTTP
  Traffic.remoteMethod(
      'GetPlateNumber', {
        accepts: [
          {arg: 'nationalId', type: 'string', required: true},
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'post', path: '/GetPlateNumber'},
      }
  );
};
