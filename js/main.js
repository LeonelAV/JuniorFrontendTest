var ourButton = document.querySelector('#our-button') //wrap the button element in a variable

var userInfo = function(){
  //console.log('button was clicked')
  var username = document.querySelector('#username').value

  var userData = function(url, callback){
    var ourRequest = new XMLHttpRequest()
    ourRequest.open('GET', url, true)
    ourRequest.responseType = 'json'
    ourRequest.onload = function(){
      if (ourRequest.readyState == 4 && ourRequest.status == 200){ //readyState 4 means the request is done and status 200 is a successful return
        callback(null, ourRequest.response)
      } else {
        callback(ourRequest.status) //an error ocurred during the request
      }
    }
    ourRequest.send()
  }


  userData('https://api.github.com/users/' + username, function(err, data) {
    if (err != null) {
      const div = document.createElement('DIV')
      const pError = document.createElement('P')
      pError.textContent = "Does not exist"
      div.className = 'error'
      div.appendChild(pError)
      const container = document.querySelector('.main-container')
      container.appendChild(div)
      document.querySelector('.error').style.display = 'inline-block'
      document.querySelector('#user-info').style.display = 'none'
      document.querySelector('#repositories-info').style.display = 'none'
    } else {
      //console.log(data)
      document.querySelector('#user-info').style.display = 'inline-flex'
      document.querySelector('#repositories-info').style.display = 'initial'
      document.querySelector('#user-photo').style.display = 'inline-block'
      document.querySelector('#user-photo').src = data.avatar_url
      document.querySelector('#name').innerHTML = '@' + data.login
      document.querySelector('#fullname').innerHTML = data.name
      document.querySelector('#bio').innerHTML = data.bio
      document.querySelector('.error').style.display = 'none'
    }
  })

  userData('https://api.github.com/users/' + username + '/repos', function(err, data){
    if (err != null ) {
      throw err
    } else {
      document.querySelector('#repositories-list').style.display = 'inline-block'
      var reposHtml = document.querySelector('#repository-details')
      var tpl = ''
      data.forEach(function(elem){
        tpl += '<li><h4>' + elem.name + '</h4>' 
            + '<div><img src="images/filled_star1600.png">' 
            + elem.stargazers_count + '<img src="images/logo.png">'
            + elem.forks_count + '</div</li>'
      })
      reposHtml.innerHTML = tpl
    }
  })
}

ourButton.addEventListener('click', userInfo)
