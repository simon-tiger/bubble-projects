function Bubbles(x, y) {
  // Initialising our bubble emitter
  this.x = x;
  this.y = y;
  this.bubbles = [];
  this.maxbubbles = 100;
  this.bubblecount = 0;
}

Bubbles.prototype.emit = function() {
  // Make sure we don't emit more than maxbubbles
  if (this.bubblecount < this.maxbubbles) {
    var dir = createVector(0,1);
    dir.rotate(random(1) - 0.5);
    dir.mult(floor(random(1,6)));
    dir.mult(-1);
    var size = floor(random(10, 50));
    var life = floor(random(30, 60));
    var bubble = {pos : createVector(this.x, this.y),
                  dir : dir,
                  size : size,
                  life : life}

    // Bubbles have the following properties
    //  dir: direction
    //  size: size of the bubble
    //  life: how many frames the bubble lives
    //  pos: the initial position of the bubble
    //   (all bubbles start at the emitter position)

    // Add the bubble to our table of bubbles
    this.bubbles.push(bubble);

    // Keep track of how many bubbles we have
    this.bubblecount = this.bubblecount + 1;
  }
}

// This function updates all the bubbles in the system
Bubbles.prototype.update = function() {
  // Loop through bubbles
  for (var k = 0; k < this.bubbles.length; k++) {
    var v = this.bubbles[k];
    // Add direction of bubble to its
    //  position, to generate new position
    v.pos.add(v.dir);

    // Subtract one from its life
    v.life = v.life - 1;

    // If this bubble's life is 0
    if (v.life === 0) {
      // Remove it from the table
      this.bubbles.splice(k, 1);

      // Reduce our bubble count
      //  (we can emit more now!)
      this.bubblecount = this.bubblecount - 1;
    }
  }
}

// This function draws all the bubbles in the system
Bubbles.prototype.draw = function() {
  // Store current style
  push();

  // Set up our bubble style
  ellipseMode(CENTER);
  stroke(255);
  strokeWeight(4);
  fill(153, 197, 210, 100);

  // Loop through bubbles and draw them
  for (var k = this.bubbles.length-1; k >= 0; k--) {
    var v = this.bubbles[k];
    ellipse(v.pos.x, v.pos.y, v.size);
  }

  // Restore original style
  pop();
}

// Use this function to perform your initial setup
function setup() {
  createCanvas(749, 768);

  // Create a global bubble emitter
  emitter = new Bubbles(0, height);
}

// This function gets called once every frame
function draw() {
  // This sets a dark background color
  background(40, 40, 50);

  // Do your drawing here
  fill(255);
  textAlign(CENTER);
  text("Drag your finger to make bubbles", width/2, 40);

  // Update and draw bubbles
  emitter.update();
  emitter.draw();
}

// This function gets called whenever a touch event occours
function mouseDragged() {
  // Whenever the screen encounters a touch event we:
  //  update the emitter position
  //  emit a single bubble
  emitter.x = mouseX;
  emitter.y = mouseY;
  emitter.emit();

  // Touch event occours when your finger moves, begins
  //  touching or ends touching
}
