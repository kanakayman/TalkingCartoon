// Check if the browser supports the Web Speech API
if (!('speechSynthesis' in window)) {
    alert('Your browser does not support the Web Speech API.');
  }
  
  const speakButton = document.getElementById('speak');
  const textInput = document.getElementById('text');
  const voiceSelect = document.getElementById('voiceSelect');
  const pitchSlider = document.getElementById('pitch');
  const rateSlider = document.getElementById('rate');
  
  let englishVoices = [];
  
  // Populate the voice selection dropdown with English voices
  const populateVoiceList = () => {
    const voices = speechSynthesis.getVoices();
    englishVoices = voices.filter((voice) => voice.lang.startsWith('en'));
  
    voiceSelect.innerHTML = '';
  
    englishVoices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = index;
      voiceSelect.appendChild(option);
    });
  };
  
  populateVoiceList();
  speechSynthesis.onvoiceschanged = populateVoiceList;

  //animation function
  const spriteContainer = document.getElementById('sprite-container');



// Number of frames in the sprite sheet
const totalFrames = 10;

// Duration of one frame in milliseconds
const frameDuration = 100;

let currentFrame = 0;
let animationInterval;

const startAnimation = () => {
  spriteContainer.classList.add('sprite-animation');

  animationInterval = setInterval(() => {
    const xPos = -(currentFrame * spriteContainer.clientWidth);
    spriteContainer.style.backgroundPosition = `${xPos}px 0`;

    currentFrame = (currentFrame + 1) % totalFrames;
  }, frameDuration);
};

const stopAnimation = () => {
  clearInterval(animationInterval);
  spriteContainer.classList.remove('sprite-animation');
  spriteContainer.style.backgroundPosition = '0 0';
  currentFrame = 0;
};


//sprite select
const spriteSheetSelect = document.getElementById('spriteSheetSelect');

// Update the sprite sheet background image
const updateSpriteSheet = () => {
  const selectedSpriteSheet = spriteSheetSelect.value;
  spriteContainer.style.backgroundImage = `url('${selectedSpriteSheet}')`;
};

// Initial update of the sprite sheet
updateSpriteSheet();

// Add event listener to spriteSheetSelect for changing the sprite sheet
spriteSheetSelect.addEventListener('change', updateSpriteSheet);

speakButton.addEventListener('click', () => {
const text = textInput.value;

// Create a new SpeechSynthesisUtterance instance
const utterance = new SpeechSynthesisUtterance(text);

// Set the voice, language, pitch, and rate
const selectedVoiceIndex = voiceSelect.value;
utterance.voice = englishVoices[selectedVoiceIndex];
utterance.lang = utterance.voice.lang;
utterance.pitch = parseFloat(pitchSlider.value);
utterance.rate = parseFloat(rateSlider.value);

// Speak the text using the Web Speech API
speechSynthesis.speak(utterance);

// Start the sprite sheet animation
startAnimation();

// Stop the animation when the speech ends
utterance.onend = () => {
stopAnimation();
};
}); 