const md5 = require('md5');

// Returns unique timestamp to use each time the API is called
function getTimeStamp() {
    let ts = Date.now();
    console.log("Timestamp generated: ", ts);
    return ts;
}

// Returns hash necessary for making API calls
function createHash(ts, private_key, public_key) {
    let preHash = ts + private_key + public_key;
    let hash = md5(preHash);
    return hash;
}

// Export functions to use elsewhere in the application
module.exports = {getTimeStamp, createHash}