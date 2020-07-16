// const canvas = document.getElementById("flower");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// var a = 0,n = 0,r = 0,c = 6;
// var x = 0, y = 0;
// var w = window.innerWidth, h = window.innerHeight;
// var cx = w/2, cy = h/2;
// var rot = 1;

// //draw stem
// ctx.beginPath();
// ctx.moveTo(cx, h);
// ctx.lineWidth = 10;
// ctx.strokeStyle = "darkgreen";
// ctx.quadraticCurveTo(cx+250, cy+100, cx, cy);
// ctx.stroke();
// ctx.lineWidth = 1;

// //start rotating
// const startRotate = () =>{
//   setInterval(function () {
//     ctx.save(); //saves the state of canvas
//     ctx.translate(cx, cy); //let's translate
//     ctx.rotate(Math.PI / 180 * (rot += 5)); //increment the angle and rotate the image 
//     ctx.restore(); //restore the state of canvas
//   }, 100);
// }

// const drawFrame = () => {

// }

// const startDrawing = () =>{
//   //draw bud
//   if(n < 100){
//     a =  (n * 137.5)*(180/Math.PI);
//     r = c * Math.sqrt(n);
//     x = r * Math.cos(a*(180/Math.PI)) + cx;
//     y = r * Math.sin(a*(180/Math.PI)) + cy;
//     ctx.beginPath();
//     ctx.arc(x, y, 6, 0, 2 * Math.PI, true);
//     ctx.strokeStyle = "lime";
//     ctx.fillStyle = 'yellow';
//     ctx.fill();
//     ctx.stroke();
//   }else{
//     //draw petals
//     a =  (n * 137.5)*(180/Math.PI);
//     r = c * Math.sqrt(n);
//     x = r * Math.cos(a*(180/Math.PI)) + cx;
//     y = r * Math.sin(a*(180/Math.PI)) + cy;
//     ctx.beginPath();
//     ctx.arc(x, y, 6, 0, 2 * Math.PI, true);
//     ctx.strokeStyle = "black";
//     ctx.fillStyle = 'hsl('+ a%256 +',100%,50%)';
//     ctx.fill();
//     ctx.stroke();
//   }
//   n++;
//   if(n < 1000)
//     requestAnimationFrame(startDrawing);
//   else
//     startRotate();
// }
// startDrawing();

const canvas = document.getElementById("flower");
const ctx = canvas.getContext("2d");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;
var circles = [];
var n = 0, cx = w/2, cy = h/2;

ctx.translate(w / 2, h / 2);

class circle {
  constructor() {
    let a = (n * 137.5)/180 * Math.PI;
    let rad = 6 * Math.sqrt(n);
    this.x = rad * Math.cos(a);
    this.y = rad * Math.sin(a);
    if (n < 50) {
      this.strokeStyle = "lime";
      this.fillStyle = 'yellow';
    } else {
      this.strokeStyle = "black";
      this.fillStyle = 'hsl(' + n*0.4 + ',100%,50%)';
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI);
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.stroke();
  }
}

const startRotate = () => {  
  ctx.clearRect(-w, -h, w*2, h*2);    
  ctx.rotate(0.9);
  circles.forEach(c => { c.draw(ctx) });
  requestAnimationFrame(startRotate);
}

const startDrawing = () => {
  circles.push(new circle(n))
  ctx.clearRect(-w, -h, w*2, h*2);
  circles.forEach(c => { c.draw(ctx) });
  n++;
  
  if (n < 1000) 
    requestAnimationFrame(startDrawing);
  else 
    startRotate();
}

startDrawing();