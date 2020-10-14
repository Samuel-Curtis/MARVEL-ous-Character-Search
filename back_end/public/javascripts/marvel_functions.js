const axios = require('axios')
const auth = require('./auth.js');

const endPoint = process.env.BASE_ENDPOINT;
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

// Get character info
async function findByName(name) {
    let timeStamp = auth.getTimeStamp();
    let hashString = auth.createHash(timeStamp, privateKey, publicKey)

    // Make call via axios
    axios.get(endPoint+'/characters', {
        params: {
            ts: timeStamp,
            apikey: publicKey,
            hash: hashString,
            name: name
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log("AN ERROR OCCURRED: ", err);
    })
}
// Get NameStartsWith

module.exports = {findByName};

