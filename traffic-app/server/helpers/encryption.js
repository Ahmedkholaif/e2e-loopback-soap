const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.resolve(__dirname,'private.asc'),'utf-8');
const publicKey = fs.readFileSync(path.resolve(__dirname,'public.asc'),'utf-8');  
const passphrase = '123456';

const encrypt = async(data)=>{
  const privKeyObj = (await openpgp.key.readArmored(privateKey)).keys[0]
  await privKeyObj.decrypt(passphrase)
  
  const options = {
      message: openpgp.message.fromText(JSON.stringify(data)),    // parse armored message
      publicKeys: (await openpgp.key.readArmored(publicKey)).keys, // for verification (optional)
      privateKeys: [privKeyObj]                                 // for decryption
  }
  return openpgp.encrypt(options).then(dd=> dd.data)
}

const decrypt = async(encryptedData)=>{
    const privKeyObj = (await openpgp.key.readArmored(privateKey)).keys[0]
    await privKeyObj.decrypt(passphrase)
    const options = {
      message: await openpgp.message.readArmored(encryptedData),    // parse armored message
      publicKeys: (await openpgp.key.readArmored(publicKey)).keys, // for verification (optional)
      privateKeys: [privKeyObj]                                 // for decryption
    }

    return openpgp.decrypt(options).then(dd=> dd.data);
}

module.exports={
  encrypt,
  decrypt,
}