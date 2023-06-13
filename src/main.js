const canvas = document.getElementById("canvas");

canvas.width = 500;
canvas.height = 800;
const ctx = canvas.getContext("2d");

ctx.rotate((45 * Math.PI) / 180);
ctx.fillStyle = "red";
ctx.fillRect(200, 200, 50, 50);

//#rotate the rectangle by 45 degrees


