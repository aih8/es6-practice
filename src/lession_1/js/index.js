import $ from 'jquery';

//requestAnimationFrame polyfill
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


const ButtonTextArr = ['暂停', '启动'];
const DirectionTextArr = ['顺时针', '逆时针'];

class Taiji {

    constructor(myCanavs, radius, smallRadius, deg) {
        const { width, height } = myCanavs;
        this.canvas = myCanavs;
        this.ctx = myCanavs.getContext('2d');

        this.width = width;
        this.height = height;

        this.ox = width / 2;
        this.oy = height / 2;

        this.ox_speed = 1;
        this.oy_speed = 1;

        this.radius = radius < (width / 2) ? radius : (width / 2);
        this.smallRadius = smallRadius;
        this.deg = deg || 0;
        this.nishizhen = true;
        this.speed = 1;

        this.move();
    }

    //清空画布
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    draw() {
        const { radius, width, height, smallRadius, ox, oy } = this;
        let halfRadius = radius / 2;
        let centerX = width / 2;
        let centerY = height / 2;

        //大的黑色半圆
        this.drawCircle('#000', radius, ox, oy, 0, 0, 0.5 * Math.PI, 1.5 * Math.PI);
        //大的黑色半圆
        this.drawCircle('#fff', radius, ox, oy, 0, 0, 1.5 * Math.PI, 2.5 * Math.PI);
        //中等上部白色半圆
        this.drawCircle('#fff', halfRadius, ox, oy, 0, -halfRadius);
        //中等下部黑色半圆
        this.drawCircle('#000', halfRadius, ox, oy, 0, halfRadius);
        //小黑圆
        this.drawCircle('#000', smallRadius, ox, oy, 0, -halfRadius);
        //小白圆
        this.drawCircle('#fff', smallRadius, ox, oy, 0, halfRadius);
        //外部灰色线
        this.drawCircleStrock('#dedede', radius);
    }

    drawCircle(color, radius, x, y, startX = 0, startY = 0, startAngle = 0, endAngle = 2 * Math.PI) {
        const { ctx, width, height, deg } = this;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x || width / 2, y || height / 2);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillStyle = color;
        ctx.arc(startX, startY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    drawCircleStrock(color, radius, x, y) {
        const { ctx, width, height, deg, ox, oy } = this;
        ctx.save();
        ctx.beginPath();
        ctx.translate(ox, oy);
        ctx.rotate(deg * Math.PI / 180);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.arc(0, 0, radius, -0.5 * Math.PI, 1.5 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    changeDir() {
        const { nishizhen } = this;
        this.nishizhen = !nishizhen;
    }

    move() {
        this.status = true;
        this.action();
    }

    changeDeg(newSpeed) {
        this.speed = newSpeed;
    }

    changeDegwhenMove() {
        const { ctx, nishizhen, deg, speed } = this;
        let nextDeg = nishizhen ? (deg - speed) : (deg + speed),
            dealDeg;
        if (nextDeg <= -180) {
            dealDeg = nextDeg + 360;
        } else if (nextDeg > 180) {
            dealDeg = nextDeg - 360;
        } else {
            dealDeg = nextDeg;
        }
        this.deg = dealDeg;
    }

    action() {
        const { ctx, nishizhen, deg, speed } = this;
        this.id = requestAnimationFrame(() => {
            console.log(`方向：${ nishizhen }；   速度 ：${ speed }；  角度：${ deg }；`);
            //更新旋转角度。deg
            this.changeDegwhenMove();

            //设置太极的中心
            this.resetTaijiCenter();

            //清空画布
            this.clear();

            //绘图
            this.draw();

            if (this.status) {
                this.action();
            }
        })
    }

    stop() {
        const { id } = this;
        this.status = false;
        if (id) {
            cancelAnimationFrame(id);
        }
    }

    resetTaijiCenter () {
    	let { ox, oy, ox_speed, oy_speed, radius, width, height } = this;
    	let nextOx = ox + ox_speed;
    	let nextOy = oy + oy_speed;

    	if (nextOx - radius <= 0 || nextOx + radius >= width) {
    		this.ox_speed = -ox_speed;
    	}

    	if (nextOy - radius <= 0 || nextOy + radius >= height) {
    		this.oy_speed = -oy_speed;
    	}

    	this.ox = nextOx;
    	this.oy = nextOy;
    }
}

$(() => {
    const myCanavs = document.getElementById('myCanavs');
    const button = $('#action');
    const direction = $('#direction');
    const rangeinput = $('#rangeinput');
    const rangevalue = $('#rangevalue');

    const taiji = new Taiji(myCanavs, 160, 20);

    button.on('click', (e) => {
        let value = e.target.value;
        console.log(value);
        if (value === ButtonTextArr[0]) {
            e.target.value = ButtonTextArr[1];
            button.removeClass('btn-default').addClass('btn-success');
            taiji.stop();
        } else if (value === ButtonTextArr[1]) {
            e.target.value = ButtonTextArr[0];
            button.removeClass('btn-success').addClass('btn-default');
            taiji.move();
        }
    });

    direction.on('click', (e) => {
        let value = e.target.value;
        console.log(value);
        if (value === DirectionTextArr[0]) {
            e.target.value = DirectionTextArr[1];
            taiji.changeDir();
        } else if (value === DirectionTextArr[1]) {
            e.target.value = DirectionTextArr[0];
            taiji.changeDir();
        }
    });

    rangeinput.on('change', (e) => {
        let value = e.target.value;
        rangevalue.html(value);
        taiji.changeDeg(Number(value));
    })
});