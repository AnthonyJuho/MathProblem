var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var Width = window.innerWidth;
var Height = window.innerHeight;

//set circle size
var r = Height/4;

//set dot size
var circler = 5;

//canvas info
var info = {
    x : 0,
    y : 0
};

canvas.width = Width;
canvas.height = Height;

//set colors
ctx.strokeStyle = "white";
ctx.fillStyle = "red";

ctx.beginPath();

//need functions
function setmove(x,y) {
    info.x = x;
    info.y = y;
    ctx.moveTo(x,y);
    ctx.closePath();
    ctx.stroke();
}
function setline(x,y) {
    info.x = x;
    info.y = y;
    ctx.lineTo(x,y);
    ctx.stroke();
}
function move(x,y) {
    info.x += x;
    info.y += y;
    ctx.moveTo(info.x,info.y);
    ctx.stroke();
}
function line(x,y) {
    info.x += x;
    info.y += y;
    ctx.lineTo(info.x,info.y);
    ctx.stroke();
}
function dot() {
    //delete previous
    ctx.clearRect(Width/2-r/2,Height/2-r/2,r,r);

    ctx.closePath();
    ctx.beginPath();

    //draw and fill circle
    ctx.arc(info.x,info.y,circler,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    move(0,0);
}


//start Location
setmove(Width/2,Height/2);
move(-r/2,-r/2*Math.sqrt(3));

//drave 6rkrgud
var angle = 0;
for(let i = 0;i<6;i++) {
    setTimeout(() => {

        var x = Math.cos(angle)*r;
        var y = Math.sin(angle)*r;
        line(x,y);
        angle += Math.PI/3;
    }, 50*i);
}

//get dots
setTimeout(() => {
    var time = 100;
    for(let i = 0; i<time; i++) {
        setTimeout(() => {
            //move distance
            var length = r/time*i;
            move(r/time,0);

            //set var
            var b = r-length;
            var a = (3*b-Math.sqrt(4*Math.pow(r,2)-3*Math.pow(b,2)))/4;
            var left = a;
            var top = -Math.sqrt(3)*(a-b);
            dot();

            //get dot(we want this)
            move(left,top);
            dot();
            move(-left,-top);
        },3000/time*i);
    }

}, 1000);
