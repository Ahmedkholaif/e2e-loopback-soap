const axios = require('axios');

module.exports = (Portal)=>{

  Portal.getCarDetails =async(nationalId)=>{
    // send req to sdb get plateNumber

    console.log({nationalId})
    const body = {nationalId};
    const sdbResponse= await axios.post(`${process.env.SDB_URL}/api/Sdbs/GetPlateNumber`, body);

    const {plateNumber} = sdbResponse.data;
    // send two req to traffic and court to get plateNumber details
    const {data:courtData} = await axios.post(`${process.env.COURT_URL}/api/Courts/CheckCar`,{plateNumber});
    const {data: trafficData} = await axios.post(`${process.env.TRAFFIC_URL}/api/traffic/CheckCar`,{plateNumber});
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
