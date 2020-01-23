'use strict';

module.exports = function(Traffic) {
  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  Traffic.CheckCar = function(plateNumber, cb) {
    console.log({plateNumber});
    console.log('kkkkkk;k');
    Traffic.CheckCar(plateNumber, function(err, response) {
      var result = response;
      console.log('kkkkkkk');
      cb(err, result);
    });
  };

  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  // Traffic.getAtomicweight = function(elementName, callback) {
  //   Traffic.GetAtomicWeight({ElementName: elementName || 'Copper'}, function (err, response) {
  //     var result = response;
  //     callback(err, result);
  //   });
  // }

  // Map to REST/HTTP
  Traffic.remoteMethod(
      'CheckCar', {
        accepts: [
          {arg: 'plateNumber', type: 'string', required: true,
            http: {source: 'query'}},
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'get', path: '/CheckCar'},
      }
  );

  // Traffic.remoteMethod(
  //     'getAtomicweight', {
  //       accepts: [
  //         {arg: 'elementName', type: 'string', required: true,
  //           http: {source: 'query'}}
  //       ],
  //       returns: {arg: 'result', type: 'object', root: true},
  //       http: {verb: 'get', path: '/GetAtomicWeight'}
  //   }
  // );
};
