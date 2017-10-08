var userInfo = function(){
  //console.log('button was clicked')
  var username = document.getElementById('username').value

  var userData = function(url, callback){

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){ //readyState 4 means the request is done and status 200 is a successful return
        callback(xhr)
      } else {
        callback(xhr.status) //an error ocurred during the request
      }
  }

  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.send()
}


  userData('https://api.github.com/users/' + username, function(xhr){
    console.log(xhr.response)
  })

  userData('https://api.github.com/users/' + username + '/repos', function(xhr){
    console.log(xhr.response)
  })
}
