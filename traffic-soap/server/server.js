const express = require('express');
const soap = require('soap');
const path = require('path');
const bodyParser = require('body-parser');
const {readFileSync} = require('fs');

const myService = {
  Traffic_Service: {// service
      Traffic_Data_PortType: { //portType
          CheckCar: async(plateNumber)=> { // operation
            
            const data =JSON.parse(  readFileSync(path.resolve(__dirname,'../public/traffic.json')) );
            const details = data.find(car => car.plateNumber === plateNumber);
            if(!details) return {error:'No Details Found'}
            return details;
          },
      }
  }
};

const app = express();
const xml = readFileSync(path.resolve(__dirname,'../public/myservice.wsdl'), 'utf8');

//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: ()=> true , limit: '5mb'}));
app.listen(8001, function(){
    soap.listen(app, '/wsdl', myService, xml, function(){
      console.log('traffic soap server initialized 8001');
      });
});

