'use strict';
const {encrypt,decrypt} = require('../helpers/encryption');

module.exports = function(Sdb) {
  
  Sdb.beforeRemote('**',async(ctx)=>{
    const {body:{payload}} = ctx.req;
    const data = await decrypt(payload)
    ctx.req.body = JSON.parse(data);
  })
  
  Sdb.afterRemote('**',async(ctx)=>{
    ctx.result = await encrypt(ctx.result);
  })
  
  
  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  Sdb.getPlateNumber = function(ctx, cb) {
    const {nationalId} = ctx.req.body;
    Sdb.GetPlateNumber(nationalId, cb);
  };

  // Map to REST/HTTP
  Sdb.remoteMethod(
      'getPlateNumber', {
        accepts: [
          {arg: 'ctx', type: 'object', http: {source: 'context'}},
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'post', path: '/GetPlateNumber'},
      }
  );
};
