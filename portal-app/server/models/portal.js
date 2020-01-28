const axios = require('axios');
const {encrypt,decrypt} = require('../helpers/encryption');
module.exports = (Portal)=>{

  Portal.getCarDetails =async(nationalId)=>{
    // send req to sdb get plateNumber
    const payload = await encrypt({nationalId});
    const sdbResponse= await axios.post(`${process.env.PROXY_URL}/sdb/api/Sdbs/GetPlateNumber`, {payload});
    const dataPo = await decrypt(sdbResponse.data);
    const {plateNumber} = JSON.parse(dataPo);
    if(!plateNumber) return {Error:'No Plate Number For the specified National ID'}
    // send two req to traffic and court to get plateNumber details

    const body2 = {payload: await encrypt({plateNumber})};

    try {
      const [cRes,tRes] = await Promise.all([
        axios.post(`${process.env.PROXY_URL}/court/api/Courts/CheckCar`,body2) ,//.then(async(res)=> {const r=await decrypt(res.data);return JSON.parse(r)}),
        axios.post(`${process.env.PROXY_URL}/traffic/api/traffic/CheckCar`,body2)//.then(async(res)=> {const r=await decrypt(res.data);return JSON.parse(r)}),
      ]);
      const courtData = JSON.parse(await decrypt(cRes.data));
      const trafficData = JSON.parse(await decrypt(tRes.data));
      return({courtData,trafficData})
    } catch (error) {
      return {error}      
    }
  };

  Portal.remoteMethod(
    'getCarDetails', {
      accepts: [
        {arg: 'nationalId', type: 'string', required: true},
      ],
      returns: {arg: 'result', type: 'object', root: true},
      http: {verb: 'post', path: '/getCarDetails'},
    }
  );
};
