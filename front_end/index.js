function doSomething() {
    console.log("doSomething was called")
    var input = {
        value: document.getElementById('input').value
    }
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', '/doSomething', true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(input))
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

/*  

var input = {
        value: document.getElementById('input').value
    }

else {



        var xhr = new window.XMLHttpRequest()
        xhr.open('POST', '/getNameStartsWith', true)
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr.onload = function(e) {
            alert(xhr.responseText)
          };
        xhr.send(JSON.stringify(input))
        
        
    }
*/