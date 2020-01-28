'use strict';

const {encrypt,decrypt} = require('../helpers/encryption');

module.exports = function(Traffic) {
  
  Traffic.beforeRemote('**',async(ctx)=>{
    const {body:{payload}} = ctx.req;
    const data = await decrypt(payload);
    ctx.req.body = JSON.parse(data);
  })

  Traffic.afterRemote('**',async(ctx)=>{
    // const {result} = ctx.res;
    ctx.result = await encrypt(ctx.result);
  })
  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  Traffic.checkCar = function (ctx, cb) {
    const {plateNumber} = ctx.req.body;
    Traffic.CheckCar(plateNumber, function (err, response) {
      var result = response;
    cb(err, result);
    });
  };

  // Map to REST/HTTP
  Traffic.remoteMethod(
      'checkCar', {
        accepts: [
          {arg: 'ctx', type: 'object', http:{source:'context'} }
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'post', path: '/CheckCar'}
      }
  );

};
