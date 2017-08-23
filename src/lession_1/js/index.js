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

    drawWrapCircle() {
        const { radius, width, height, smallRadius } = this;
        let halfRadius = radius / 2;
        let centerX = width / 2;
        let centerY = height / 2;

        //大的黑色半圆
        this.drawCircle('#000', radius, undefined, undefined, 0, 0, 0.5 * Math.PI, 1.5 * Math.PI);
        //中等上部白色半圆
        this.drawCircle('#fff', halfRadius, undefined, undefined, 0, -halfRadius);
        //中等下部黑色半圆
        this.drawCircle('#000', halfRadius, undefined, undefined, 0, halfRadius);
        //小黑圆
        this.drawCircle('#000', smallRadius, undefined, undefined, 0, -halfRadius);
        //小白圆
        this.drawCircle('#fff', smallRadius, undefined, undefined, 0, halfRadius);
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
        const { ctx, width, height, deg } = this;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x || width / 2, y || height / 2);
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

    changeDeg (newSpeed) {
    	this.speed = newSpeed;
    }

    action() {
        const { ctx, nishizhen, deg, speed } = this;
        this.id = requestAnimationFrame(() => {
            this.deg = nishizhen ? (deg - speed) : (deg + speed);
            console.log(this.speed, nishizhen, deg)
            this.clear();
            this.drawWrapCircle();
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

}

$(() => {
    const myCanavs = document.getElementById('myCanavs');
    const button = $('#action');
    const direction = $('#direction');
    const rangeinput = $('#rangeinput');
    const rangevalue = $('#rangevalue');

    const taiji = new Taiji(myCanavs, 160, 20);
    // taiji.move();

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