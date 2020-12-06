/* 
 * Party parrot gifs from http://cultofthepartyparrot.com
 * Circular mouse trail logic from Tim Tilton on Dynamic Drive http://dynamicdrive.com/dynamicindex13/circletext.htm
 */

const PARROTS = 25,
SIZE = 70,
SPACING = 4,
DIAMETER = 30,
ROTATION = 0.1,
SPEED = 0.3,
OFFSET = 20;

let parrots = [],
a = Math.round(SIZE * DIAMETER * 0.208333),
current = OFFSET,
mouse = {
  x: a + OFFSET,
  y: a + OFFSET };


// populate parrots
for (let i = 0; i < PARROTS; i++) {
  parrots[i] = new Parrot(i);
}

function Parrot(i) {
  this.x = 0;
  this.y = 0;
  this.X = 0;
  this.Y = 0;
  this.div = document.createElement('div');
  this.div.id = 'parrot-' + i;
  this.div.className = 'parrot-' + getRandom(1, 20);
  document.body.appendChild(this.div);
  console.log(this.div);
};

function placeParrot(parrot, x, y) {
  parrot.x = x;
  parrot.y = y;
  parrot.div.style.left = parrot.x + 'px';
  parrot.div.style.top = parrot.y + 'px';
}

function makeCircle() {
  let parrot;
  current -= ROTATION;
  for (let i = PARROTS - 1; i > -1; --i) {
    parrot = parrots[i];
    parrot.div.style.top = Math.round(parrot.y + a * Math.sin((current + i) / SPACING) - 15) + 'px';
    parrot.div.style.left = Math.round(parrot.x + a * Math.cos((current + i) / SPACING)) + 'px';
  }
}

addEventListener("mousemove", function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function draw() {
  let parrot = parrots[0];
  let prevParrot = parrots[0];
  parrot.x = parrot.X += (mouse.x - parrot.X) * SPEED;
  parrot.y = parrot.Y += (mouse.y - parrot.Y) * SPEED;
  for (let i = PARROTS - 1; i > 0; --i) {
    parrot = parrots[i];
    prevParrot = parrots[i - 1];
    parrot.x = parrot.X += (prevParrot.x - parrot.X) * SPEED;
    parrot.y = parrot.Y += (prevParrot.y - parrot.Y) * SPEED;
  }
  makeCircle();
  requestAnimationFrame(draw);
}

draw();