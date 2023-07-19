var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var start = document.getElementById('start');
var container = document.getElementById('container');

//checkboxes
var standard = document.getElementById('standard');
var trace = document.getElementById('trace');
var triangle = document.getElementById('triangle');


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

//checkbox boolean
var checkboolean = {
    standard : {
        boolean : false,
        time : 0
    },
    trace : {
        boolean : false,
        time : 0
    },
    triangle : {
        boolean : false,
        time : 0
    }
}

canvas.width = Width;
canvas.height = Height;

container.style.top = Height/2+"px";

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
function clear() {

    //delete previous
        // ctx.clearRect(info.x-2*circler,info.y-2*circler,4*circler,4*circler);
        ctx.clearRect(0,0,Width,Height);
        draw6rkrgud();
}
function dot() {

    ctx.closePath();
    ctx.beginPath();

    //draw and fill circle
    ctx.arc(info.x,info.y,circler,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    move(0,0);
}
function draw6rkrgud() {
    var firstx = info.x;
    var firsty = info.y;
    
    setmove(Width/2,Height/2);
    move(-r/2,-r/2*Math.sqrt(3));

    var angle = 0;
    for(let i = 0;i<6;i++) {
            var x = Math.cos(angle)*r;
            var y = Math.sin(angle)*r;
            line(x,y);
            angle += Math.PI/3;
    }
    info.x = firstx;
    info.y = firsty;
}

standard.addEventListener('click', function() {
    checkboolean.standard.time++;
});
trace.addEventListener('click', function() {
    checkboolean.trace.time++;
});
triangle.addEventListener('click', function() {
    checkboolean.triangle.time++;
});

start.addEventListener('click', () => {
    if(checkboolean.standard.time%2 == 1) {
        checkboolean.standard.boolean = true;
    }
    if(checkboolean.trace.time%2 == 1) {
        checkboolean.trace.boolean = true;
    }
    if(checkboolean.triangle.time%2 == 1) {
        checkboolean.triangle.boolean = true;
    }
    container.style.display = "none";
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
        for(let i = 1; i<=time; i++) {
            setTimeout(() => {
                //move distance
                var length = r/time*i;
                move(r/time,0);

                if(!checkboolean.trace.boolean) {
                    clear();
                }
                //set var
                var b = r-length;
                var a = (3*b+Math.sqrt(4*Math.pow(r,2)-3*Math.pow(b,2)))/4;
                var left = a;
                var top = Math.sqrt(3)*(a-b);
                if(checkboolean.standard.boolean) {
                    dot();
                    move(left,top);
                    dot();
                    move(-left,-top);
                }
                var newx = 0.5*left-Math.sqrt(3)/2*top;
                var newy = Math.sqrt(3)/2*left+0.5*top;
                move(newx,newy);
                dot();
                move(-newx,-newy);

                if(checkboolean.triangle.boolean) {
                    line(left,top);
                    line(newx-left,newy-top);
                    line(-newx,-newy);
                }

            },3000/time*i);
        }

    }, 1000);

});
