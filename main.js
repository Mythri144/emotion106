Webcam.set({
    width:350,
    height:300,
    imgae_format:'jpg',
    jpg_quality:100
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="image" src="'+data_uri+'">';
    });
}

console.log('ML5 Version = ',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2CUJtyMPS/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded! ');
}

function speak(){
    var declare = window.speechSynthesis;
    speak_1 = "The first prediction is, " + prediction1 + ", ";
    speak_2 = "The second prediction is, " + prediction2 + ", ";
    var utter = new SpeechSynthesisUtterance(speak_1+speak_2);
    declare.speak(utter);
}

function predict_emoji(){
    img = document.getElementById("image");
    classifier.classify(img,getResult);
}

function getResult(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("predict1").innerHTML = results[0].label;
        document.getElementById("predict2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label == "happy"){
            document.getElementById("emoji1").innerHTML = "&#128512; ";            
        }

        if(results[0].label == "sad"){
            document.getElementById("emoji1").innerHTML = "&#128546; ";            
        }

        if(results[0].label == "angry"){
            document.getElementById("emoji1").innerHTML = "&#128545;";            
        }

        if(results[1].label == "happy"){
            document.getElementById("emoji2").innerHTML = "&#128512; ";            
        }

        if(results[1].label == "sad"){
            document.getElementById("emoji2").innerHTML = "&#128546; ";            
        }

        if(results[1].label == "angry"){
            document.getElementById("emoji2").innerHTML = "&#128545;";            
        }
    }
}