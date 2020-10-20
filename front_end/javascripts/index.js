/*
$(document).ready(function() {
        console.log('Document Event Fired!')
        let avengers = ['Iron Man', 'Hulk', 'Captain America', 'Black Widow', 'Hawkeye']
        let avenger = avengers[Math.floor(Math.random()*avengers.length)];
        getCharacterInfo(avenger)
}); */

$("#search").autocomplete({ 
    delay: 300,
    source: function (req, res) {
        
        let input = document.getElementById('search').value;
        console.log("INPUT TO BE USED IN REQUEST", input)

        if (input == "") {
            console.log("Input Blank, do not call.")
        } else {
            axios.post('/getNameStartsWith', { value: input })
            .then(response => {
                let list = response.data.characters;
                console.log("RETURNING: ", list);
                res(list)
            })
            .catch(err => {
                console.log("ERROR OCCURED WHILE RETRIEVING CHARACTER AUTOCOMPLETE LIST: ")
                if (err.response) {
                    console.log("Error with Response: ", err)
                } else if (err.request) {
                    console.log("Error with Request: ", err)
                } else {
                    console.log("Other weird things happened: ", err)
                }
            })
        
        }
        
    } 
    
});

function getCharacterInfo() {
    
    let input = document.getElementById('search').value;
    console.log("Input in getCharInfo: ", input)
    if (input == "") {
        console.log("Input Blank, do not call.")
    } else {
        axios.post('/getCharacterInfo', { value: input })
        .then(response => {
            let res = response.data;
            console.log("Character Object: ", res.character);
            console.log("Comics Arr: ", res.comics)
            
            // Character Info
            document.getElementById('charName').innerHTML = res.character.name;
            document.getElementById('charDesc').innerHTML = res.character.description;
            document.getElementById('charPic').src = res.character.picture;
            
            // Comic 1
            document.getElementById('comName0').innerHTML = res.comics[0].name
            document.getElementById('comPic0').src = res.comics[0].picture;
            
            // Comic 2
            document.getElementById('comName1').innerHTML = res.comics[1].name
            document.getElementById('comPic1').src = res.comics[1].picture;
            
            // Comic 3
            document.getElementById('comName2').innerHTML = res.comics[2].name
            document.getElementById('comPic2').src = res.comics[2].picture;
        })
        .catch(err => {
            console.log("ERROR OCCURED WHILE RETRIEVING CHARACTER INFO: ")
            if (err.response) {
                console.log("Error with Response: ", err)
                console.log("Config: ", err.config)
            } else if (err.request) {
                console.log("Error with Request: ", err)
                console.log("Config: ", err.config)
            } else {
                console.log("Other weird things happened: ", err)
            }
        })
    }
}