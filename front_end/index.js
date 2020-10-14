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