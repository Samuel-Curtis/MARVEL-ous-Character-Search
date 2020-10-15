const axios = require('axios')
const auth = require('./auth.js');

const endPoint = process.env.BASE_ENDPOINT;
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

let timeStamp = auth.getTimeStamp();
let hashString = auth.createHash(timeStamp, privateKey, publicKey);

// Get character info
async function findByName(name) {

    // Make call via axios
    axios.get(endPoint + '/characters', {
        params: {
            ts: timeStamp,
            apikey: publicKey,
            hash: hashString,
            name: name
        }
    })
        .then(response => {
            let res = response.data.data.results;
            console.log("Result Object: ", res[0])
            console.log("Name: ", res[0].name);
            console.log("Description: ", res[0].description);
        })
        .catch(err => {
            console.log("AN ERROR OCCURRED: ", err);
        })
    }
    
    // Get NameStartsWith
    async function getNameStartsWith(name) {
        
        // Make call via axios
        return axios.get(endPoint + '/characters', {
            params: {
                ts: timeStamp,
                apikey: publicKey,
                hash: hashString,
                limit: 5,
                nameStartsWith: name
            }
        })
        .then(response => {
            let res = response.data.data.results;
            
            let characters = [];

            res.forEach(element => {
                characters.push(element.name)
            });
            
            console.log("Character Name Array in function: ", characters)
            return characters;
        })
    .catch(err => {
        console.log("AN ERROR OCCURRED: ", err);
    })
}

module.exports = { findByName, getNameStartsWith };

