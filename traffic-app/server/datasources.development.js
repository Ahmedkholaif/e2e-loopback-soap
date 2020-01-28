module.exports={
  'traffic-soap': {
    "url": process.env.SOAP_URL,
    "name": "traffic-soap",
    "wsdl": `${process.env.SOAP_URL}?wsdl`,
    "remotingEnabled": true,
    "connector": "soap"
  },
  db: {
    "name": "db",
    "connector": "memory"
  }
}
