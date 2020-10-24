$("#search").autocomplete({ 
    delay: 300,
    source: function (req, res) {
        
        let input = document.getElementById('search').value;

        if (input == "") {
            console.log("Input Blank, do not call.")
        } else {
            axios.post('/getNameStartsWith', { value: input })
            .then(response => {
                let list = response.data.characters;
                res(list);
            }) // End Then
            .catch(err => {
                console.log("ERROR OCCURED WHILE RETRIEVING CHARACTER AUTOCOMPLETE LIST: ")
                if (err.response) {
                    console.log("Error with Response: ", err)
                } else if (err.request) {
                    console.log("Error with Request: ", err)
                } else {
                    console.log("Other weird things happened: ", err)
                }
            }) // End Catch
        } // End Else
    } // End Source 
});

function getCharacterInfo() {
    
    let input = document.getElementById('search').value;

    if (input == "") { 
        console.log("Input Blank, do not call.")
    } else {
        axios.post('/getCharacterInfo', { value: input })
        .then(response => {
            let res = response.data;
            let character = res.character;
            let comics = res.comics
            
            $(function() {
                $(".hide").css("visibility", "visible");
            })

            // Character Info
            document.getElementById('charName').innerHTML = character.name;
            document.getElementById('charDesc').innerHTML = character.description;
            document.getElementById('charPic').src = character.picture;
            document.getElementById('charLink').href = character.link;

            // Comic 1
            document.getElementById('comName0').innerHTML = comics[0].name
            document.getElementById('comDesc0').innerHTML = comics[0].description
            document.getElementById('comPic0').src = comics[0].picture;
            document.getElementById('comLink0').href = comics[0].link;
            
            // Comic 2
            document.getElementById('comName1').innerHTML = res.comics[1].name
            document.getElementById('comDesc1').innerHTML = comics[1].description
            document.getElementById('comPic1').src = res.comics[1].picture;
            document.getElementById('comLink1').href = comics[1].link;
            
            // Comic 3
            document.getElementById('comName2').innerHTML = res.comics[2].name
            document.getElementById('comDesc2').innerHTML = comics[2].description
            document.getElementById('comPic2').src = res.comics[2].picture;
            document.getElementById('comLink2').href = comics[2].link;
        }) // End Then
        .catch(err => {
            console.log("ERROR OCCURED WHILE RETRIEVING CHARACTER/COMIC INFO: ")
            if (err.response) {
                console.log("Error with Response: ", err)
                console.log("Config: ", err.config)
            } else if (err.request) {
                console.log("Error with Request: ", err)
                console.log("Config: ", err.config)
            } else {
                console.log("Other weird things happened: ", err)
                console.log("Config: ", err.config)
            }
        }) // End Catch
    } // End Else
}