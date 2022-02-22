let zoomLevel = 50;
let forward = true;

function setup() {
	pixelDensity(1);
	createCanvas(windowWidth, windowHeight);
	noFill();
	stroke(255);
	frameRate(10);
	colorMode(RGB, (width + height) / 2);
	strokeWeight(0.5);
}

function draw() {
	background(0);

	let circleCount = circleFractal(
		width / 2 + zoomLevel / 2,
		height / 2 - zoomLevel / 2,
		zoomLevel,
		1
	);

	stroke(width + height);
	text(
		"FPS: 10 (limited)" +
			"\ncircle count: " +
			circleCount +
			"\npress `w` to move forward\nand `s` to move backward",
		10,
		height - 80
	);

	if (zoomLevel >= 100000) {
		zoomLevel -= 50000;
	}

	if (forward) zoomLevel *= 1.03;
	else zoomLevel /= 1.03;
}

function circleFractal(x, y, diameter, counter) {
	if (diameter < 4) return counter - 1;
	if (
		x < -diameter ||
		x > width + diameter ||
		y < -diameter ||
		y > height + diameter
	) {
		return counter - 1;
	}
	stroke(x, y, (x + y) / 2);
	circle(x, y, diameter);
	counter = circleFractal(x - diameter / 2, y, diameter / 2, counter + 1);
	counter = circleFractal(x + diameter / 2, y, diameter / 2, counter + 1);
	counter = circleFractal(x, y + diameter / 2, diameter / 2, counter + 1);

	return counter;
}

function keyPressed() {
	if (key == "w") {
		zoomLevel *= 1.2;
		forward = true;
		redraw();
	} else if (key == "s") {
		zoomLevel /= 1.2;
		forward = false;
		redraw();
	}
}
