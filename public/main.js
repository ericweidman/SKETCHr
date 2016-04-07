var canvasApp ={
  urls:{
    canvasIMG: '/upload',
    canvasIMGget: '/photo/{5}',
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

document.getElementById('save').addEventListener('click',function(){
  var canvasDATA = canvas.toDataURL(0, 0, context.canvas.width, context.canvas.height);
  var canvasString = JSON.stringify(canvasDATA);
  console.log(canvasString);
  saveCanvasImg(canvasString);
});
function getCanvasImg(){
  $.ajax({
    method:'GET',
    url:'/photo/5',
    data: canvasIMG,
    success: function(canvasIMG){
      // console.log(canvasDATA);
      alert('it worked!');
    }
  });
}
document.getElementById('open').addEventListener('click', function(){
  $('openTEST').append('canvasIMG');
})
