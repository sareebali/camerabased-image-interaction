let handpose;
let video;
let predictions = [];
let img;
let mode = "exit";
let isPoint = true;
let isRightPoint = true;
let mappedX;
let mappedY;
let imageX;
let imageY;
let imagetrail = [];
let thumbX;
let thumbY;
let tX;
let tY;
let select;
let topleftx1;
let bottomrightx1;
let toplefty1;
let bottomrighty1;
let isPaste = false;

function preload() {
  img = loadImage('minecraftpic.png'); 
}

function setup() {
  createCanvas(1200, 500); 

  video = createCapture(VIDEO);
  video.size(600, 500);

  handpose = ml5.handpose(video, modelReady);

  handpose.on("predict", results => {
    predictions = results;
  });

  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  background(255);

  image(video, 0, 0, 600, 500);

  image(img, 600, 0, 600, 500);

  drawHelper();
}

function drawHelper() {
  
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    const keypoint = prediction.landmarks[8];

    mappedX = map(keypoint[0], 0, 640, 0, 600);
    mappedY = map(keypoint[1], 0, 480, 0, 500);

    if (isPoint){
    fill(255, 50, 0);
    noStroke();
    ellipse(mappedX, mappedY, 15, 15);
    }

    imageX = mappedX+600;
    imageY = mappedY;

    if (isRightPoint){
      fill(255, 50, 0);
      noStroke();
      ellipse(imageX, imageY, 15, 15);
    }

    if (mode == "exit"){
      isRightPoint = true;
    }
    else if (mode == "freehand"){
      isRightPoint = false;
      imagetrail.push({x:imageX, y:imageY});
      drawtrail();
    }
    else if (mode == "selection"){
      const keypointthumb = prediction.landmarks[4];
      thumbX = map(keypointthumb[0], 0, 640, 0, 600);
      thumbY = map(keypointthumb[1], 0, 480, 0, 500);
      tX = thumbX + 600;
      tY = thumbY;
      if (isPaste){
        image(select, topleftx1, toplefty1, bottomrightx1-topleftx1, bottomrighty1-toplefty1);
        isPoint = true;
        isRightPoint = true;
      }
      else {makebox();}
    }
    else if (mode == "copy"){
      let topleftx = min(imageX, tX);
      let bottomrightx = max(imageX, tX);
      let toplefty = min(imageY, tY);
      let bottomrighty = max(imageY, tY);
      select = get(topleftx, toplefty, bottomrightx-topleftx, bottomrighty-toplefty);
      mode = "selection";
    }
    else if (mode == "paste"){
      topleftx1 = min(imageX, tX);
      bottomrightx1 = max(imageX, tX);
      toplefty1 = min(imageY, tY);
      bottomrighty1 = max(imageY, tY);
      mode = "selection";
      isPaste = true;
    }
  }
}

function keyPressed(){
  if (key=='e'){
    mode = "exit";
  }
  else if (key=='c'){
    let topleftx = min(imageX, tX);
    let bottomrightx = max(imageX, tX);
    let toplefty = min(imageY, tY);
    let bottomrighty = max(imageY, tY);
    select = get(topleftx, toplefty, bottomrightx-topleftx, bottomrighty-toplefty);
    mode = "copy"
  }
  else if (key=='v'){
    mode = "paste";
  }
  else if (key=='f'){
    mode = "freehand";
  }
  else if (key=='s'){
    mode = "selection";
    isPoint = false;
    isRightPoint = false;
  }
}

function drawtrail(){
  stroke(255, 50, 0);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let i = 0; i < imagetrail.length; i++){vertex(imagetrail[i].x, imagetrail[i].y);}
  endShape();
}

function makebox(){
  stroke(255, 50, 0);
  strokeWeight(4);
  noFill();

  quad(mappedX, mappedY, thumbX, mappedY, thumbX, thumbY, mappedX, thumbY);
  quad(tX, tY, imageX, tY, imageX, imageY, tX, imageY);
}