function getCharacterInfo() {
    var input = document.getElementById('input').value
    
    if (input === "") {
        console.log("Input Blank, do not call.")
    } else {
        axios
        .post('/getCharacterInfo', {
            value: input
        })
        .then(response => {
            let res = response.data;
            console.log("Character Object: ", res.character);
            console.log("Comics Arr: ", res.comics)

            document.getElementById('charName').innerHTML = res.character.name;
            document.getElementById('charDesc').innerHTML = res.character.description;
            document.getElementById('charPic').src = res.character.picture;

            document.getElementById('comName0').innerHTML = res.comics[0].name
            document.getElementById('comPic0').src = res.comics[0].picture;
            
            document.getElementById('comName1').innerHTML = res.comics[1].name
            document.getElementById('comPic1').src = res.comics[1].picture;
            
            document.getElementById('comName2').innerHTML = res.comics[2].name
            document.getElementById('comPic2').src = res.comics[2].picture;
        })
        .catch(err => {
            console.log("ERROR OCCURED IN AXIOS FE: ", err)
        })
    }
}

async function getNameStartsWith() {

    var input = document.getElementById('input').value
    
    if (input === "") {
        console.log("Input Blank, do not call.")
    } else {
        axios
        .post('/getNameStartsWith', {
            value: input
        })
        .then(response => {
            console.log("RESPONSE IN AXIOS FE: ", response.data.characters);

            document.getElementById('char0').innerHTML = response.data.characters[0];
            document.getElementById('char1').innerHTML = response.data.characters[1];
            document.getElementById('char2').innerHTML = response.data.characters[2];
            document.getElementById('char3').innerHTML = response.data.characters[3];
            document.getElementById('char4').innerHTML = response.data.characters[4];
        })
        .catch(err => {
            console.log("ERROR OCCURED IN AXIOS FE: ", err)
        })
    }

}