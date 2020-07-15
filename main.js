const canvas = document.getElementById("flower");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var a = 0,n = 0,r = 0,c = 6;
var x = 0, y = 0;
var w = window.innerWidth, h = window.innerHeight;
var cx = w/2, cy = h/2;
var rot = 1;

//draw stem
ctx.beginPath();
ctx.moveTo(cx, h);
ctx.lineWidth = 10;
ctx.strokeStyle = "darkgreen";
ctx.quadraticCurveTo(cx+250, cy+100, cx, cy);
ctx.stroke();
ctx.lineWidth = 1;

//start rotating
const startRotate = () =>{
  setInterval(function () {
    ctx.save(); //saves the state of canvas
    ctx.translate(cx, cy); //let's translate
    ctx.rotate(Math.PI / 180 * (rot += 5)); //increment the angle and rotate the image 
    ctx.restore(); //restore the state of canvas
  }, 100);
}

const startDrawing = () =>{
  //draw bud
  if(n < 100){
    a =  (n * 137.5)*(180/Math.PI);
    r = c * Math.sqrt(n);
    x = r * Math.cos(a*(180/Math.PI)) + cx;
    y = r * Math.sin(a*(180/Math.PI)) + cy;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI, true);
    ctx.strokeStyle = "lime";
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();
  }else{
    //draw petals
    a =  (n * 137.5)*(180/Math.PI);
    r = c * Math.sqrt(n);
    x = r * Math.cos(a*(180/Math.PI)) + cx;
    y = r * Math.sin(a*(180/Math.PI)) + cy;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI, true);
    ctx.strokeStyle = "black";
    ctx.fillStyle = 'hsl('+ a%256 +',100%,50%)';
    ctx.fill();
    ctx.stroke();
  }
  n++;
  if(n < 1000)
    requestAnimationFrame(startDrawing);
  else
    startRotate();
}
startDrawing();