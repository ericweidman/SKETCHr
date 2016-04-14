
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

var crayonImg = new Image();
crayonImg.globalAlpha=0.1;
crayonImg.src='/img/crayon-tool.png';

//clicking the mouse


//add click property
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
// console.log(paint);
// console.log(canvasID);

///history

///sizes

var currentSize= 5;
var lineSize= new Array();
var current='#000000';
var clickColor= new Array();

//add tools
var clickTool = new Array();
var curTool='marker';
var crayon = "crayon";
var marker = "marker";
var eraser = "eraser";
var spray ='spray';



///add click
function addClick(x,y,dragging)
{
clickX.push(x);
clickY.push(y);
clickDrag.push(dragging);
if(curTool == "eraser"){
  clickColor.push("white");
}else{
    clickColor.push(current);
    }
lineSize.push(currentSize);
}

function changeBlur(){
  if(curTool=='spray'){
    context.shadowBlur=40;
    context.shadowColor=current;
    console.log('this is spray color',current);
  }
  else{
    context.shadowBlur=0;
    context.shadowColor=current;
  }
}

// function clearThis(){
//   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
// }


function draw(){
context.lineJoin = 'round';
var j=clickY.length-1
var i=clickX.length-1;
/////code by ZACH ⚔ ^//
if(curTool == "crayon") {
  context.globalAlpha=0.3;
  context.drawImage(crayonImg,clickX[i],clickY[j],currentSize,currentSize)
}
else {
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
context.globalAlpha = 1; // Transparency
}

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




// Clear canvas
 document.getElementById('clear').addEventListener('click', function() {
 context.clearRect(0,0,canvas.width,canvas.height);
 clickX = [];
 clickY = [];
 clickTool = [];
 clickColor = [];
 clickDrag = [];
 lineSize = []

 });

 //UNDO

 function undo(){
   clickX.pop();
   clickY.pop();
   draw();
 }
 $('#undo').mousedown(function() {
   interval = setInterval(undo,50)
 });
 $('#undo').mouseup(function(){
   clearInterval(interval);
 })

$('#spray').click('click',function(){
   curTool='spray';
   changeBlur();
   console.log('spray',curTool);
 });
 document.getElementById('eraser').addEventListener('click',function(){
   curTool='eraser';
   changeBlur();
 });
 document.getElementById('marker').addEventListener('click',function(){
   curTool='marker';
   changeBlur();
 });

 document.getElementById('crayon').addEventListener('click',function(){
   curTool='crayon';
   changeBlur();
   console.log("WHAT IS curTool", curTool)
 });

 $('#colorPick').on('change', function(){
   current=this.value;
   context.shadowColor=this.value;
   console.log(current);
 });
 $('#slider').on('input', function(){
   currentSize=this.value;
   console.log(this.value);
 });




 // SPRAY TOOL
 /*var timeout;
 var density = 50;

 function getRandomFloat(min, max) {
   return Math.random() * (max - min) + min;
 }

 canvasID.onmousedown = function(e) {
   ctx.lineJoin = context.lineCap = 'round';
   clickX = e.clickX;
   clickY = e.clickY;

   timeout = setTimeout(function draw() {
     for (var i = density; i--; ) {
       var angle = getRandomFloat(0, Math.PI*2);
       var radius = getRandomFloat(0, 20);
       context.fillRect(
         clientX + radius * Math.cos(angle),
         clientY + radius * Math.sin(angle),
         1, 1);
     }
     if (!timeout) return;
     timeout = setTimeout(draw, 50);
   }, 50);
 };
 canvasID.onmousemove = function(e) {
   clickX = e.clickX;
   clickY = e.clickY;
 };
 canvasID.onmouseup = function() {
   clearTimeout(timeout);
 };*/
