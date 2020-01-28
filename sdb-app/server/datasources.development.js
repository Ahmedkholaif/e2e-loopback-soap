module.exports = {
  'sdb-soap': {
    'url': process.env.SOAP_URL,
    'name': 'sdb-soap',
    'wsdl': `${process.env.SOAP_URL}?wsdl`,
    'remotingEnabled': true,
    'connector': 'soap',
  },
  db: {
    'name': 'db',
    'connector': 'memory',
  },
};
