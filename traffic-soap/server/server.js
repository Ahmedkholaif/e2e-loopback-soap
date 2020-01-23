const express = require('express');
const soap = require('soap');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const {readFileSync} = require('fs');

const myService = {
  Traffic_Service: {// service
      Traffic_Data_PortType: { //portType
          CheckCar: async(plateNumber)=> { // operation
            
            console.log({plateNumber})
            const data =JSON.parse(  readFileSync(path.resolve(__dirname,'../public/traffic.json')) );
            const details = data.find(car => car.plateNumber === plateNumber);
            console.log({details});
            if(!details) return {error:'No Details Found'}
            return details;
          },

          // // This is how to define an asynchronous function with a callback.
          // MyAsyncFunction: function(args, callback) {
          //     // do some work
          //     callback({
          //         name: args.name
          //     });
          // },

          // This is how to define an asynchronous function with a Promise.
          // MyPromiseFunction: function(args) {
          //     return new Promise((resolve) => {
          //       // do some work
          //       resolve({
          //         name: args.name
          //       });
          //     });
          // },

          // This is how to receive incoming headers
      //     HeadersAwareFunction: function(args, cb, headers) {
      //         return {
      //             name: headers.Token
      //         };
      //     },

      //     // You can also inspect the original `req`
      //     reallyDetailedFunction: function(args, cb, headers, req) {
      //         console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
      //         return {
      //             name: headers.Token
      //         };
      //     }
      // },
      // Testing: {
      //   MyTest: function(args){
      //     console.log('ddddddd')
      //     return 'dddddd'
      //   }
      }
  }
};

const app = express();
const xml = readFileSync(path.resolve(__dirname,'../public/myservice.wsdl'), 'utf8');

//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: ()=> true , limit: '5mb'}));
app.listen(8001, function(){
    console.log('8001 ex')
    soap.listen(app, '/wsdl', myService, xml, function(){
      console.log(' soap server initialized');
      });
});

