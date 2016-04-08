var canvasApp ={
  urls:{
    canvasIMG: '/upload',
    getCanvasImg: '/photo/',
    canvasGallery: '/gallery/'
  }
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

var id = '33';

function getGallery(){
  $.ajax({
    url:canvasApp.urls.canvasGallery,
    method:'GET',
    success: function(){
      console.log('here they are',canvasApp.urls.canvasGallery);
      // alert('it worked!');
    }
  });
}




function getCanvasImg(canvasIMGID){
  $.ajax({
    method:'GET',
    url:canvasApp.urls.getCanvasImg + id,
    success: function(canvasIMG){
      var img = new Image();
      var canvasGet = decodeURIComponent(canvasIMG.fileName).split('=')[1].substr(1);
      console.log('got it 2', canvasGet);
      // console.log('here it is again',canvasGet);
      img.src = decodeURIComponent(canvasGet);
      // console.log('and decoded',img);
      document.body.appendChild(img);
      alert('gotIT!');
    }
  });
}

document.getElementById('save').addEventListener('click',function(){
  var canvasDATA = canvas.toDataURL(0, 0, context.canvas.width, context.canvas.height);
  var canvasString = JSON.stringify(canvasDATA);
  console.log(canvasString);
  saveCanvasImg(canvasString);
});


document.getElementById('open').addEventListener('click', function(){
  getCanvasImg();
  getGallery();

  // var img = new Image();
  // img.src = decodeURIComponent(canvasIMG);
  // console.log(window.glob.fileName);
  // $('openTEST').append(canvasIMG);
});
