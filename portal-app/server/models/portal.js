const axios = require('axios');

module.exports = (Portal)=>{

  Portal.getCarDetails =async(nationalId)=>{
    // send req to sdb get plateNumber

    console.log({nationalId})
    const body = {nationalId};
    const sdbResponse= await axios.post(`${process.env.PROXY_IP}/sdb/GetPlateNumber`, body);

    const {plateNumber} = sdbResponse.data;
    console.log({sdbResponse})
    // send two req to traffic and court to get plateNumber details
    const {data:courtData} = await axios.post(`${process.env.PROXY_IP}/court/CheckCar`,{plateNumber});
    const {data: trafficData} = await axios.post(`${process.env.PROXY_IP}/traffic/CheckCar`,{plateNumber});
    return({courtData,trafficData})
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
