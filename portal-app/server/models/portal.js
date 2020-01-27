const axios = require('axios');

module.exports = (Portal)=>{

  Portal.getCarDetails =async(nationalId)=>{
    // send req to sdb get plateNumber

    console.log({nationalId})
    const body = {nationalId};
    const sdbResponse= await axios.post(`${process.env.PROXY_URL}/sdb/api/Sdbs/GetPlateNumber`, body);

    const {plateNumber} = sdbResponse.data;
    if(!plateNumber) return {Error:'No Plate Number For the specified National ID'}
    // send two req to traffic and court to get plateNumber details

    try {
      const [{data:courtData},{data: trafficData}] = await Promise.all([
        axios.post(`${process.env.PROXY_URL}/court/api/Courts/CheckCar`,{plateNumber}),
        axios.post(`${process.env.PROXY_URL}/traffic/api/traffic/CheckCar`,{plateNumber}),
      ]);
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
