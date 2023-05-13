//img="";
status="";
objects=[];
model="";
capture="";
width=screen.width -70;
height = screen.height -300;
drop = 0;
videeo="";
dropdown="";
video="";
var SpeeRecognition = window.webkitSpeechRecognition;
synth = window.speechSynthesis; 
var recognition = new SpeeRecognition();

/*
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });
  capture.elt.setAttribute('playsinline', '');
  capture.hide();
}

function draw() {
  background(0);
  image(capture, 0, 0, width, height);
}


*/

function preload(){
   // img = loadImage("dog_cat.jpg");
}

function setup(){

dropdown = createSelect();
dropdown.position(10, 10);

dropdown.option('Back Camera');
dropdown.option('Front Camera');

dropdown.changed(changeOption);

}


function modelLoaded(){
    console.log("Model loaded!!!!");
    status = true;
   
}

function gotResult(error, results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        objects=results;


    }
}

function changeOption() {
  // do something when the dropdown value changes
  console.log(dropdown.value());
  drop = dropdown.value();

  if(drop == "Front Camera"){

    canvas = createCanvas(700,500);
        canvas.center();
        video = createCapture(VIDEO);
        video.hide()
        model = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Started detecting";
  
  }
  if(drop == "Back Camera"){

  document.getElementById("status").innerHTML="Status: Started detecting";
    canvas= createCanvas(width, windowHeight);
    canvas.position(0,80);
     capture = createCapture({
       audio: false,
       videeo: {
         facingMode: {
           exact: "environment"
         }
       }
     });
     capture.elt.setAttribute('playsinline', '');
     capture.hide();
  
     model = ml5.objectDetector('cocossd', modelLoaded);
  
  
  }
  
      
    }
   /*else{
  
        canvas = createCanvas(700,500);
        canvas.center();
        video = createCapture(VIDEO);
        video.hide()
        model = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Started detecting";
  
    }*/



function draw(){
 

 //   image(img,0,0,700,500);
 if(drop == "Back Camera"){
    image(capture, 0, 0, windowWidth, windowHeight);
    textSize(32);
    textAlign(CENTER);
    text(dropdown,width/2, height/2);
 }
 if(drop == "Front Camera"){
    image(video, 0, 0, windowWidth, windowHeight);
 }

//700, 500

    if(status!=""){
 r = random(255);
 g = random(255);
 b = random(255);

 if(drop == "Back Camera"){
    model.detect(capture, gotResult);
 }
 if(drop == "Front Camera"){
    model.detect(video, gotResult);
 }
     

    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML="Detection complete";

       
        fill(r,g,b);
        stroke(r,g,b);
percent = Math.floor(objects[i].confidence * 100);

        text(objects[i].label+" "+percent+" %",objects[i].x+10, objects[i].y+20);
        const  searchTerm = objects[i].label;
        console.log("input done.");
       
         const    url = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`;
         fetch(url)
         .then(response => response.json())
         .then (data => {
           textspeech= new SpeechSynthesisUtterance(`<h2>${data.title}</h2><p>${data.extract}</p>`);
         
           synth.speak(textspeech);
         });
       

        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
    }
       
    
        }
   
}
