const parallax = []
const parallaxv2 = []
let obstaculosImg = []
let obstaculosObj = []
let slide = []
let dead = []
let jump = []
let run = []
let background
let floor
let x
let runing
let jumping
let jumpUp
let jumpDown
let sliding
let score
let collision
let x1,y1,w1,h1
let turno = 0


function preload(){
	runing = 0
	jumping = 0
	jumpUp = 0
	jumpDown = 10
	sliding = 0
	score = 0
	floor =loadImage('imagenes/fondo/fondo2.png')
	floor2 =loadImage('imagenes/fondo/fondo.jpg')
	background = loadImage('imagenes/fondo/piso.png');
	for(let i=0;i<10;i++){
		slide[i]=loadImage(`imagenes/personaje/slide/slide${i+1}.png`)
		dead[i]=loadImage(`imagenes/personaje/dead/dead${i+1}.png`)
	}
	for(let i=0;i<16;i++)
		jump[i]=loadImage(`imagenes/personaje/jump/jump${i+1}.png`)
	for(let i=0;i<8;i++)
		run[i]=loadImage(`imagenes/personaje/run/run${i+1}.png`)
	for(let i=0;i<3;i++)
		obstaculosImg[i]=loadImage(`imagenes/obstaculos/o${i+1}.png`)
}
function setup() {
	frameRate(25)
	createCanvas(800, 600);
	for (var i = 0; i <2; i++){
		parallax.push(new Background(floor,i*width,0,width,height-100,1.5))
		parallaxv2.push(new Background(floor2,i*width,0,width,height-100,1.5))
	}
	for (var i = 0; i<2; i++){
		parallax.push(new Background(background,i * width, height-100,width,100,4))
		parallaxv2.push(new Background(background,i * width, height-100,width,100,4))
	}
}

function draw() {
	image(background,x--, 0, width, height-100)

	if (score<400){
		for (const p of parallax) {
			p.draw()
			p.move()
		}
	}else if (score>400&&score<800){
		for (const pa of parallaxv2) {
			pa.draw()
			pa.move()
		}
	}else{
		for (const par of parallax) {
			par.draw()
			par.move()
		}
	}
	for (const o of obstaculosObj) {
		o.draw()
		o.move()
	}
	obstaculo()

	for (var i = 0; i < obstaculosObj.length; i++) {
	collision = collideRectRect(obstaculosObj[i].x+25,obstaculosObj[i].y+35,obstaculosObj[i].w-35,obstaculosObj[i].h,x1,y1,w1,h1)
	}
	if (collision){
		button = createButton("Restart")
		textSize(42)
		/*textSize(42)*/
		fill('#000')
		text('G A M E  O V E R'/*+score*/,width/3,height/2)
		button.position((width/4)*3.4,(height/5)*3)
		button.mousePressed(play)
		noLoop()
	}
	console.log(collision)
	buttonPress()
	textSize(32)
	fill('#000')
	text('Score: '+score,width-200,50)
	score++
}

function play(){
	location.reload()
}
function buttonPress(){

	if (keyCode==38){
		if (jumping<jump.length) {

			if(jumpUp<10){
				image(jump[jumping],60,height-220-(jumpUp*23),150,130)
				x1=85
				y1=height-220-(jumpUp*23)
				w1=105
				h1=100
				jumpUp++
			}else{
				image(jump[jumping],60,height-220-(jumpDown*23),150,130)
				x1=85
				y1=height-220-(jumpDown*23)
				w1=105
				h1=100
				jumpDown--
			}
			jumping++
		}else{
			jumping=0
			if(jumpUp<10){
				image(jump[jumping],60,height-220-(jumpUp*23),150,130)
				x1=85
				y1=height-220-(jumpUp*23)
				w1=105
				h1=100
				jumpUp++
			}else{
				image(jump[jumping],60,height-220-(jumpDown*23),150,130)
				x1=85
				y1=height-220-(jumpDown*23)
				w1=105
				h1=105
				jumpDown--
			}
		}

		if (jumpUp==10&&jumpDown==0) {
			keyCode=32
			jumpUp=0
			jumpDown=10
		}
	}else if(keyIsDown(DOWN_ARROW)){
		if (sliding<slide.length) {
			image(slide[sliding],60,height-220,150,130)
			x1=85
			y1=height-100
			w1=105
			h1=130
			sliding++
		}else{
			sliding=0
			image(slide[sliding],60,height-220,150,130)
			x1=85
			y1=height-100
			w1=105
			h1=130
		}
	}else{
		if (runing<run.length) {
			image(run[runing],60,height-220,150,130)
			runing++
			x1=85
			y1=height-260
			w1=105
			h1=130
		}else{
			runing=0
			image(run[runing],60,height-220,150,130)
			x1=85
			y1=height-260
			w1=105
			h1=130
		}
	}
}

function obstaculo(){
	if (score<200){
		if (score%70==0) {
			turno++
			let random=numRand()
			if (random==1)
				obstaculosObj.push(new Obstaculo(obstaculosImg[random],width, height-280,100,111,15))
			else
				obstaculosObj.push(new Obstaculo(obstaculosImg[random],width, height-210,100,111,16))
		}
	}else if (score>200&&score<500){
		if (score%50==0) {
			turno++
			let random=numRand()
			if (random==1)
				obstaculosObj.push(new Obstaculo(obstaculosImg[random],width, height-280,100,111,15))
			else
				obstaculosObj.push(new Obstaculo(obstaculosImg[random],width, height-210,100,111,16))
		}
	}else{
		if (score%35==0) {
			turno++
			let random=numRand()
			if (random==1)
				obstaculosObj.push(new Obstaculo(obstaculosImg[random],width, height-280,100,111,20))
			else
				obstaculosObj.push(new Obstaculo(obstaculosImg[random],width, height-210,100,111,21))
		}
	}
}

function numRand(){
	return Math.floor(Math.random() * (3 - 0)) + 0;
}