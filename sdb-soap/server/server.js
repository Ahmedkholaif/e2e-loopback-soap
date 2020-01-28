const express = require('express');
const soap = require('soap');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const {readFileSync} = require('fs');

const myService = {
  SDB_Service: {// service
      SDB_Data_PortType: { //portType
          GetPlateNumber: async(nationalId)=> { // operation
            const data =JSON.parse(  readFileSync(path.resolve(__dirname,'../public/sdb.json')) );
            const details = data.find(person => person.nationalId === nationalId);
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
      console.log('sdb soap server initialized 8001');
      });
});

