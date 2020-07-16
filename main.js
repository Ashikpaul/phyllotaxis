const canvas = document.getElementById("flower");
const ctx = canvas.getContext("2d");
const blah = canvas.getContext("2d");
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
    ctx.save();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI);
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

const startRotate = () => {  
  ctx.clearRect(-w/2, -h/2, w*2, h*2);   
  ctx.rotate(0.5);
  circles.forEach(c => { c.draw(ctx) });
  requestAnimationFrame(startRotate);
}

const startDrawing = () => {
  ctx.globalAlpha = 1.0;
  ctx.textAlign = "center";
  ctx.font = "30px monospace";
  ctx.fillStyle = "yellow";
  ctx.fillText('Phyllotaxis', 0, -380);
  ctx.fillStyle = "red";
  ctx.font = "20px monospace";
  ctx.fillText("WARNING: Don't stare at it for long", 0, -340);
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.font = "15px monospace";
  ctx.fillText('By Ashik', 20, -365);
  ctx.beginPath();
  ctx.moveTo(0, h/2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "darkgreen";
  ctx.quadraticCurveTo(250, 100, 0, 0);
  ctx.stroke();
  ctx.closePath();
  circles.push(new circle(n))  
  circles.forEach(c => { c.draw(ctx) });
  n++;
  
  if (n < 1000) 
    requestAnimationFrame(startDrawing);
  else 
    startRotate();
}

startDrawing();