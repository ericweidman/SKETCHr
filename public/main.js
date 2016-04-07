var canvasApp ={
  urls:{
    saveCanvas: '/upload'
  }
};
function saveCanvasImg(canvasString){
  $.ajax({
    url:canvasApp.urls.saveCanvas,
    method:'POST',
    data: {saveCanvas:canvasString},
    success: function(saveCanvas){
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
