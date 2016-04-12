var canvasApp ={

  urls:{
    canvasIMG:        '/upload',
    getCanvasImg:     '/photo/',
    canvasGallery:    '/gallery',
    deleteCanvas:     '/photo/',
    createUser:       '/create-user/',
    logIt:            '/login',
    logOut:           '/logout',
    getAllImg:        '/user-photos'
  }
};

function addUser(user){
  $.ajax({
    url: canvasApp.urls.createUser,
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(user),
    success: function(data){
      console.log('user added!', data);
    },
    error: function(error){
      console.log("Add User", error);
    }
  });
}

function logUser(curUser){
  $.ajax({
    url: canvasApp.urls.logIt,
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(curUser),
    success: function(data){
      hideHomePage();
      console.log('user logged in!', data);
      console.log('this');
      $('.artist').append("<span class='artistName'>"+" "+curUser.userName+"</span>");
    },
    error: function(error){
        console.log('not logged in',error);
        $('.error').append("user name or password incorrect");
    }
  });
}

function logout(){
  //if success window.sessionStorage.removeItem(VALUEOFSESSIONNAME);
    $.ajax({
      url: canvasApp.urls.logOut,
      method: 'POST',
      success: function(data){
        console.log('LOGGED OUT!',data);
          location.reload();//hacky solution
          window.sessionStorage.removeItem('JSESSION');
        }
      });
    };

function saveCanvasImg(canvasString){
  $.ajax({
    url:canvasApp.urls.canvasIMG,
    method:'POST',
    data: {canvasIMG:canvasString},
    success: function(canvasIMG){
      // console.log(canvasDATA);
      alert('it worked!');
    }
  });
}


function getGallery(){
  $.ajax({
    url:canvasApp.urls.canvasGallery,
    method:'GET',
    success: function(data){
      console.log('here is my data',data);
      // alert('it worked!');
    }
  });
}

function deleteImg(){
  $.ajax({
    method:'DELETE',
    url: canvasApp.urls.deleteCanvas + id,
    success: function(){
      console.log('deleted!');
    }
  });
}
id = '35';

function getCanvasImg(){
  $.ajax({
    method:'GET',
    url:canvasApp.urls.getAllImg,
    // contentType: 'json',
    success: function(data){
      console.log(data);
      var enc = decodeURIComponent(data[2].fileName);
      var imgSrc = enc.slice(11,enc.length - 1);
      var img = new Image();
      img.src = imgSrc;
      document.body.appendChild(img);

      // var img = new Image();
      // var canvasGet = decodeURIComponent(data)[0];
      // console.log(canvasGet);
      // window.glob = data;
      // console.log('got it', data[0].fileName);
      // // console.log('here it is again',canvasGet);
      // img.src = canvasGet;
      // // console.log('and decoded',img);
      // document.body.appendChild(img);
      // alert('gotIT!');
    }
  });
}

$('#userForm').submit(function(event){
  event.preventDefault();
  var user= {};
  user.userName = $('input[name="newName"]').val();
  user.passwordHash = $('input[name="newPassword"]').val();
  addUser(user);
  console.log('submitted');
});

$('#logIn').submit(function(event){
  event.preventDefault();
  var curUser= {};
  curUser.userName = $('input[name="Name"]').val();
  curUser.passwordHash = $('input[name="Password"]').val();
  logUser(curUser);
});

$('#logOut').on('click',function(){
  event.preventDefault();
  logout();
  $(".new-user").removeClass('inactive');
  $(".main-canvas").addClass('inactive');
});

$('#galleryHome').on('click',function(){
  event.preventDefault();
  $(".main-canvas").addClass('inactive');
  $('.gallery').removeClass('inactive');
})

$('#canvasHome').on('click',function(){
  event.preventDefault();
  $('.main-canvas').removeClass('inactive');
  $('.gallery').addClass('inactive');
})

function hideHomePage(event) {
  $(".new-user").addClass('inactive');
  $(".main-canvas").removeClass('inactive');
}

document.getElementById('save').addEventListener('click',function(){
  var canvasDATA = canvas.toDataURL(0, 0, context.canvas.width, context.canvas.height);
  var canvasString = JSON.stringify(canvasDATA);
  console.log(canvasString);
  saveCanvasImg(canvasString);
});

document.getElementById('delete').addEventListener('click', function(){
  // deleteImg();
});


document.getElementById('open').addEventListener('click', function(){
  getCanvasImg();
});

function grabSessionValue(name) {
  return window.sessionStorage.getItem(name);
}
