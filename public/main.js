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

$('#userForm').submit(function(event){
  event.preventDefault();
  var user= {};
  user.userName = $('input[name="newName"]').val();
  user.passwordHash = $('input[name="newPassword"]').val();
  addUser(user);
  console.log('submitted');
});


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



document.getElementById('save').addEventListener('click',function(){
  event.preventDefault();
  var imgName={};
  imgName.picName = $('input[class="nameImg"]').val();
  console.log('image give a name');
  var canvasDATA = canvas.toDataURL(0, 0, context.canvas.width, context.canvas.height);
  var canvasString = JSON.stringify(canvasDATA);
  saveCanvasImg(canvasString,imgName);
});

function saveCanvasImg(canvasString,imgName){
  var imgString=JSON.stringify(imgName);
  console.log(imgString,canvasString);
  $.ajax({
    url:canvasApp.urls.canvasIMG,
    method:'POST',
    dataType:'json',
    data: {
      imgName:imgString,
      canvasIMG:canvasString
    },
    success: function(canvasIMG){
      alert('it worked!');
    }
  });
}



/////===============DO NOT EDIT THIS =================///////
//
// function saveCanvasImg(canvasString){
//   $.ajax({
//     url:canvasApp.urls.canvasIMG,
//     method:'POST',
//     data: {canvasIMG:canvasString},
//     success: function(canvasIMG){
//       // console.log(canvasDATA);
//       alert('it worked!');
//     }
//   });
// }


//
// document.getElementById('save').addEventListener('click',function(){
//   var canvasDATA = canvas.toDataURL(0, 0, context.canvas.width, context.canvas.height);
//   var canvasString = JSON.stringify(canvasDATA);
//   console.log(canvasString);
//   saveCanvasImg(canvasString);
// });

/////===============DO NOT EDIT THIS =================///////



function getGallery(){
  $.ajax({
    url:canvasApp.urls.canvasGallery,
    method:'GET',
    success: function(data){
      $('.gallerySpace').html('');
      data.forEach(function(element,idx) {
        var enc = decodeURIComponent(element.fileName);
        console.log(data);
        var arter= element.user.userName;
        var imgSrc = enc.slice(11,enc.length - 1);
        var img = new Image();
        img.src = imgSrc;
        $('.gallerySpace').append(img);
        $('.gallerySpace').append('<p>'+'created by '+arter+'</p>');
      });
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
        var enc = decodeURIComponent(data[0].fileName);
        var imgSrc = enc.slice(11,enc.length - 1);
        var img = new Image();
        img.src = imgSrc;
        $('.profileSpace').append(img);
      // console.log(data);
      // var enc = decodeURIComponent(data[0].fileName);
      // var imgSrc = enc.slice(11,enc.length - 1);
      // var img = new Image();
      // img.src = imgSrc;
      // $('.gallerySpace').append(img);
    }
  });
}

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
  page.reload();
  // $(".new-user").removeClass('inactive');
  // $(".main-canvas").addClass('inactive');
});

$('#galleryHome').click('click',function(){
  event.preventDefault();
  $(".main-canvas").addClass('inactive');
  $('.gallery').removeClass('inactive');
  getGallery();
});

$('#canvasHome').click('click',function(){
  event.preventDefault();
  $('.main-canvas').removeClass('inactive');
  $('.gallery').addClass('inactive');
  console.log('clicked');
});

function hideHomePage(event) {
  $(".new-user").addClass('inactive');
  $(".main-canvas").removeClass('inactive');
}


document.getElementById('delete').addEventListener('click', function(){
  // deleteImg();
});


document.getElementById('open').addEventListener('click', function(){
  getCanvasImg();
});

function grabSessionValue(name) {
  return window.sessionStorage.getItem(name);
}
