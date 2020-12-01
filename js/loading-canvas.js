const width = window.innerWidth;
const height = window.innerHeight;
const canvas = document.querySelector('.loading-screen');
const ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;

function drawBall(x1Pos, y1Pos){
    ctx.beginPath();
    ctx.lineTo(x1Pos, y1Pos)
    ctx.lineWidth = 10
    ctx.stroke();
    ctx.lineCap = 'round';
}

window.addEventListener("mousemove", e => {
  const x = e.pageX;
  const y = e.pageY;
    drawBall(x, y, 9);
});

const clear = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#aa00ee";
}
let canvInt = setInterval(clear, 8000)

console.log(canvInt);

