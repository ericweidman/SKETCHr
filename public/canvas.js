
//establish Canvas
var canvasID = document.getElementById('canvasID');
canvas = document.createElement('canvas');
canvas.setAttribute('width', '500');
canvas.setAttribute('height', '500');
canvas.setAttribute('id', 'canvas');
canvasID.appendChild(canvas);

if(typeof G_vmlCanvasManager != 'undefined'){
  canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext('2d');

//clicking the mouse
$('#canvas').mousedown(function(e){
  var moveX = e.pageX - this.offsetLeft;
  var moveY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  draw();
});
//moving the mouse after clicked
$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    draw();
  }
});
//after the mouse button is released
$('#canvas').mouseup(function(e){
  paint=false;
});
//when the mouse leaves the canvas
$('#canvas').mouseleave(function(e){
  paint=false;
});


//add click property
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
// console.log(paint);
// console.log(canvasID);

///sizes

var currentSize= 5;
var lineSize= new Array();

document.getElementById('size2').addEventListener('click',function(){
  currentSize=2;
});

document.getElementById('size5').addEventListener('click',function(){
  currentSize=5;
});
document.getElementById('size10').addEventListener('click',function(){
  currentSize=10;
});
document.getElementById('size20').addEventListener('click',function(){
  currentSize=20;
});
document.getElementById('size40').addEventListener('click',function(){
  currentSize=40;
});
document.getElementById('size80').addEventListener('click',function(){
  currentSize=80;
});
document.getElementById('size160').addEventListener('click',function(){
  currentSize=160;
});



//colors

var white='#ffffff';
var black='#000000';
var red='#BB3437';
var blue='#4E69A2';
var yellow='#FBDE5F';
var green='#89CF3A';
var orange='#D2872A';
var purple='#725C93';
var grey='#C2C2C2';
var current=black;
var clickColor= new Array();
//colors
document.getElementById('black').addEventListener('click',function(){
  current=black;
});
document.getElementById('white').addEventListener('click',function(){
  current=white;
});
document.getElementById('red').addEventListener('click',function(){
  current=red;
});
document.getElementById('blue').addEventListener('click',function(){
  current=blue;
});
document.getElementById('yellow').addEventListener('click',function(){
  current=yellow;
});
document.getElementById('green').addEventListener('click',function(){
  current=green;
});
document.getElementById('orange').addEventListener('click',function(){
  current=orange;
});
document.getElementById('purple').addEventListener('click',function(){
  current=purple;
});
document.getElementById('grey').addEventListener('click',function(){
  current=grey;
});

///add click
function addClick(x,y,dragging)
{
clickX.push(x);
clickY.push(y);
clickDrag.push(dragging);
clickColor.push(current);
lineSize.push(currentSize);
}
///defines draw
function draw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  // context.strokeStyle = '#000000';
  context.lineJoin = 'round';
  // context.lineWidth = 2;

  for(var i=0; i < clickX.length; i++){
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    }else{
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = lineSize[i];
    context.stroke();
  }
}
//clears canvas
