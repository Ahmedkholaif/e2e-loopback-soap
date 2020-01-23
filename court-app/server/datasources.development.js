module.exports = {
  'court-soap': {
    'url': process.env.SOAP_URL,
    'name': 'court-soap',
    'wsdl': `${process.env.SOAP_URL}?wsdl`,
    'remotingEnabled': true,
    'connector': 'soap',
  },
  db: {
    'name': 'db',
    'connector': 'memory',
  },
};
