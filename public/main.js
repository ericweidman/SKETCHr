var canvasApp ={

  urls:{
    canvasIMG:        '/upload',
    getCanvasImg:     '/photo/',
    canvasGallery:    '/gallery',
    deleteCanvas:     '/photo/',
    createUser:       '/create-user/',
    logIt:            '/login',
    logOut:           '/logout',
    getAllImg:        '/user-photos/',
    makeComment:      '/add-comment',
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
      $('.artist').append("<span class='artistName'>"+" "+curUser.userName+"</span>");
    },
    error: function(error){
        console.log('not logged in',error);
        $('.error').html('');
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

function saveCanvasImg(canvasDATA,imgName){
  // var imgString=JSON.stringify(imgName);
  console.log(imgName,canvasDATA);
  $.ajax({
    url:canvasApp.urls.canvasIMG,
    method:'POST',
    dataType:'json',
    data: {
      imgName:imgName,
      canvasIMG:canvasDATA
    },
    success: function(canvasIMG){
      alert('it worked!');
    }
  });
}

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
        // var imgSrc = enc.slice(11,enc.length - 1);
        var namer= element.picName;
        console.log(namer);
        var img = new Image();
        img.src = enc;
        $('.gallerySpace').prepend(img);
        $('.gallerySpace').prepend('<p data-image-id="' + element.id +'">' + namer+' '+'created by '+arter+'</p>');
        $('.gallerySpace').prepend('<input type=text class="comment"/><button type="submit" class="critique"/>');
      });
    }
  });
}

$('body').on('click','.critique',function(event){
  event.preventDefault();
  console.log("WHAT AM I",this)
  var id = $(this).siblings('p').data('image-id');
  console.log("ID IS THIS", $(this).siblings('p').data('image-id'));
  var com = $('input[class="comment"]').val();
  console.log('comment sent');
  postComment(com,id);
});



function postComment(com,id){
  $.ajax({
    url:canvasApp.urls.makeComment +"/"+id,
    method:'POST',
  //  contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: {
      com
    },
    success: function(){
      console.log('this comment',com);
    }
  });
}


function getCanvasImg(){
  $.ajax({
    method:'GET',
    url:canvasApp.urls.getAllImg,
    contentType: 'json',
    success: function(data){
      $('.profileSpace').html('');
      data.forEach(function(element,ndx){
        var enco = decodeURIComponent(element.fileName);
        // var pic= element.picName;
        var namae= element.picName;
        var pic = new Image();
        pic.src = enco;
        pic.classList.add('picture');
        pic.setAttribute('data-id',element.id);
        console.log('the ID of',element.picName,'is:', element.id);
        $('.profileSpace').append(pic);
        $('.profileSpace').append('<button class="delThis" onclick="deleteThis(this)" data-id="' + element.id + '">delete</button>')
      });
    }
  });
}


function deleteImg(id){
  $.ajax({
    method:'DELETE',
    url: canvasApp.urls.deleteCanvas + id,
    success: function(){
      console.log('deleted!');
    }
  });
}

function deleteThis(elem){
  if(confirm('are you sure you want to delete this image?')){  var id = $(elem).data('id');
    console.log('this is the id',id);
    $("*[data-id="+id+"]").remove();
    deleteImg(id);
  }else{
    alert('image not deleted');
  }

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



$('#userForm').submit(function(event){
  event.preventDefault();
  var user= {};
  user.userName = $('input[name="newName"]').val();
  user.passwordHash = $('input[name="newPassword"]').val();
  addUser(user);
  $('.hello').html('');
  $('.hello').append('now just log in!');
  console.log('submitted');
});

document.getElementById('save').addEventListener('click',function(){
  event.preventDefault();
  var imgName={};
  imgName.picName = $('input[class="nameImg"]').val();
  console.log('image give a name');
  var canvasDATA = canvas.toDataURL(0, 0, context.canvas.width, context.canvas.height);
  // var canvasString = JSON.stringify(canvasDATA);
  saveCanvasImg(canvasDATA,imgName.picName);
});

function hideHomePage(event) {
  $(".new-user").addClass('inactive');
  $(".main").removeClass('inactive');
}

$('#profileHome').on('click', function(){
  $('.main-canvas').addClass('inactive');
  $('.gallery').addClass('inactive');
  $('.profile').removeClass('inactive');
  getCanvasImg();
});

$('#galleryHome').on('click', function(){
  $('.profile').addClass('inactive');
  $('.main-canvas').addClass('inactive')
  $('.gallery').removeClass('inactive');
  getGallery();
});


$('#canvasHome').on('click',function(){
  $('.main-canvas').removeClass('inactive');
  $('.gallery').addClass('inactive');
  $('.profile').addClass('inactive')

});


function grabSessionValue(name) {
  return window.sessionStorage.getItem(name);
}

$('#more').click('click',function(event){
  event.preventDefault();
  $('.about').toggle('.inactive');
});
