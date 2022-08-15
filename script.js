// "use strict";

const playButton = document.querySelector('#playButton');
const audio = document.querySelector('audio');
let loader = document.querySelector('.loader');
let container = document.querySelector('.container');
let musicgif = document.querySelector('.musicgif');
let joke = "Hello world";
let speech
let jokearr = [];

function loading() {
    loader.hidden = false;
    container.hidden = true;
    musicgif.hidden = true;
    console.log("I WORKED");
}

function loaded() {
    loader.hidden = true;
    container.hidden = false;

    musicgif.hidden = true;
}
async function textToSpeechApi() {
    const encodedParams = new URLSearchParams();
    encodedParams.append("voice_code", "en-US-1");
    encodedParams.append("text", joke);
    encodedParams.append("speed", "1.00");
    encodedParams.append("pitch", "1.00");
    encodedParams.append("output_type", "audio_url");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '492a121abcmsh957a97cde9cfadfp1e5e8cjsnd1ce91661995',
            'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
        },
        body: encodedParams
    };

    const data = await fetch('https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize', options);
    speech = await data.json();
    speech = speech.result.audio_url;
    audio.src = speech;

    audio.onloadedmetadata = () => {

        audio.play();

        loader.hidden = true;
        musicgif.hidden = false;
    }
    audio.onended = loaded;

}
async function getJoke() {
    const getJokeUrl = 'https://v2.jokeapi.dev/joke/Any?type=single';
    try {
        const data = await fetch(getJokeUrl);
        jokearr = await data.json();
        joke = jokearr.joke;
        console.log(joke);
        textToSpeechApi();


    } catch (error) {
        console.log("THERE IS AN ERROR!!!", error);
    }

}
//getJoke();
playButton.addEventListener('click', function() {
    loading();
    getJoke();



});