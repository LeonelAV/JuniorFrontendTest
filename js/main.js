var ourButton = document.getElementById('our-button') //wrap the button element in a variable

var userInfo = function(){
  //console.log('button was clicked')
  var username = document.getElementById('username').value

  var userData = function(url, callback){
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){ //readyState 4 means the request is done and status 200 is a successful return
        callback(null, xhr.response)
      } else {
        callback(status) //an error ocurred during the request
      }
  }

  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.send()
}


  userData('https://api.github.com/users/' + username, function(err, data){
    if(err != null ) {
      document.getElementById('error').style.display = 'inline-block'
      document.getElementById('user-info').style.display = 'none'
      document.getElementById('repositories-info').style.display = 'none'
  	} else {
      console.log(data)
      document.getElementById('user-info').style.display = 'inline-flex'
      document.getElementById('repositories-info').style.display = 'initial'
      document.getElementById('error').style.display = 'none'
      document.getElementById('user-photo').style.display = 'inline-block'
      document.getElementById('user-photo').src = data.avatar_url
      document.getElementById('name').innerHTML = '@' + data.login
      document.getElementById('fullname').innerHTML = data.name
      document.getElementById('bio').innerHTML = data.bio
    }
  })



  userData('https://api.github.com/users/' + username + '/repos', function(err, data){
    if (err != null ) {
      console.log('something went wrong')
  	} else {
      document.getElementById('repositories-list').style.display = 'inline-block'
      for (i = 0; i < data.length; i++) {
        document.getElementById('repository-details').innerHTML += `<li><h4>${data[i].name}</h4><div><img src="images/filled_star1600.png"> ${data[i].stargazers_count}<img src="images/logo.png"> ${data[i].forks_count}</div</li>`
      }
    }
  })
}

ourButton.addEventListener('click', userInfo) 
