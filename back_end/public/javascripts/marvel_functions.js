/********************************************************
 *                                                      *
 *  If you are looking to use the Official Marvel API,  *
 *      use the following link to get started!          *
 *                                                      *
 *          https://developer.marvel.com/               *
 *                                                      *
 ********************************************************/

const axios = require('axios')
const auth = require('./auth.js');

const endPoint = process.env.BASE_ENDPOINT;
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

let timeStamp = auth.getTimeStamp();
let hashString = auth.createHash(timeStamp, privateKey, publicKey);

// Get character info, returns a character object based on the name variable
function findByName(name) {

    // Make call via axios
    return axios.get(endPoint + '/characters', {
        params: {
            ts: timeStamp,
            apikey: publicKey,
            hash: hashString,
            name: name
        }
    })
        .then(response => {
            
            // Just parsing through the data to get to the good stuff!
            let res = response.data.data.results;

            // Retrieve desired character data 
            let id = res[0].id;
            let link = res[0].urls[1].url
            let name = res[0].name;
            let description = res[0].description;
            let image_url = res[0].thumbnail.path + "/standard_xlarge." + res[0].thumbnail.extension;

            // Create character object
            var character = {
                name: name,
                description: description,
                picture: image_url,
                link: link,
                id: id
            }

            // Return character object
            return character;
        })
        .catch(err => {
            console.log("AN ERROR OCCURRED INSIDE findByName(): ", err);
        })
}

// Get NameStartsWith, Returns an array of names that begin with the given parameter
function getNameStartsWith(name) {

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

            // Just parsing through the data to get to the good stuff!
            let res = response.data.data.results;

            let characters = [];

            res.forEach(element => {
                characters.push(element.name)
            });

            return characters;
        })
        .catch(err => {
            console.log("AN ERROR OCCURRED INSIDE getNameStartsWith(): ", err);
        })
}

// Get Comic Info, returns an array of 3 comics based on the character ID parameter
function getComicsByCharId(id) {

    return axios.get(endPoint + '/characters/' + id + '/comics', {
        params: {
            ts: timeStamp,
            apikey: publicKey,
            hash: hashString,
            limit: 15,
            format: 'comic',
            orderBy: 'issueNumber'

        }
    })
        .then(response => {

            // Just parsing through the data to get to the good stuff!
            let res = response.data.data.results

            let comics = [];
            let comicsFound = 0;
            let loop = 0;

            while (comicsFound != 3) {

                var thumbnailPath = res[loop].thumbnail.path;

                // If there is no image or description, skip current comic and check the next
                if (thumbnailPath.includes("image_not_available")) {
                    console.log("Comic has no image, moving on.");
                    loop++;
                }

                // If there is an image, then create a comic object and push it to the array
                else {
                    let comURL = res[loop].urls[0].url
                    let comID = res[loop].id;
                    let comName = res[loop].title;
                    let comDesc = res[loop].description;
                    let comPic = res[loop].thumbnail.path + "/portrait_incredible." + res[loop].thumbnail.extension;

                    var comic = {
                        id: comID,
                        name: comName,
                        description: comDesc,
                        picture: comPic,
                        link: comURL
                    }

                    comics.push(comic);
                    loop++;
                    comicsFound++;
                } // End Else
            } // End While Loop
            return comics;
        })
        .catch(err => {
            console.log("ERROR: ", err);
        })
}

module.exports = { findByName, getNameStartsWith, getComicsByCharId };