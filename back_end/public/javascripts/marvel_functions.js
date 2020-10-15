const axios = require('axios')
const auth = require('./auth.js');

const endPoint = process.env.BASE_ENDPOINT;
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

let timeStamp = auth.getTimeStamp();
let hashString = auth.createHash(timeStamp, privateKey, publicKey);

// Get character info
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
            let res = response.data.data.results;

            // Retrieve desired character data 
            let id = res[0].id;
            let name = res[0].name;
            let description = res[0].description;
            let image_url = res[0].thumbnail.path + "/standard_large." + res[0].thumbnail.extension;

            // Create character object
            var character = {
                name: name,
                description: description,
                picture: image_url,
                id: id
            }

            // Return character object
            return character;

        })
        .catch(err => {
            console.log("AN ERROR OCCURRED: ", err);
        })
}

// Get NameStartsWith
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

// Get Comic Info
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
                    let comID = res[loop].id;
                    let comName = res[loop].title;
                    let comDesc = res[loop].description;
                    let comPic = res[loop].thumbnail.path + "/portrait_xlarge." + res[loop].thumbnail.extension;

                    var comic = {
                        id: comID,
                        name: comName,
                        description: comDesc,
                        picture: comPic,
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

