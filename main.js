objects = [];
Status = "";
song = "";
video = "";

function preload(){
    song = loadSound("Alarm.mp3");
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw(){
    image(video, 0, 0, 480, 380);

    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Detected Objects";

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == "person"){
            document.getElementById("output").innerHTML = "BABY FOUND";
            console.log("stop");
            song.stop();
        }
        else{
           document.getElementById("output").innerHTML = "BABY NOT FOUND";
            console.log("play");
            song.play();  
        }
        if(objects.length == 0){
            document.getElementById("output").innerHTML = "BABY NOT FOUND";
            console.log("play");
            song.play();  
        }
      }
    }

    function modelLoaded(){
        console.log("Model Loaded!");
        Status = true;
    }

    function gotResult(error, results){
        if(error){
            console.error(error);
        }
        console.log(results);
        objects = results;
    }