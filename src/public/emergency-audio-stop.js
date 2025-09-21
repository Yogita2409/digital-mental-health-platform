// EMERGENCY AUDIO KILLER SCRIPT
// This script runs immediately when the page loads to stop any audio

console.log('🛑 EMERGENCY AUDIO KILLER SCRIPT LOADED');

const killAllAudio = () => {
  console.log('🛑 Running emergency audio kill...');
  
  // Kill all audio elements
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
      audio.muted = true;
      audio.loop = false;
      audio.autoplay = false;
      audio.remove();
    } catch (e) {
      console.log('Error stopping audio element:', e);
    }
  });
  
  // Kill any audio sources
  const sources = document.querySelectorAll('source[type*="audio"]');
  sources.forEach(source => source.remove());
  
  // Try to stop Web Audio API contexts
  try {
    if (window.AudioContext || window.webkitAudioContext) {
      // Close all audio contexts
      if (window.audioContexts) {
        window.audioContexts.forEach(ctx => {
          try {
            ctx.close();
          } catch (e) {
            console.log('Error closing audio context:', e);
          }
        });
      }
    }
  } catch (e) {
    console.log('Error with audio contexts:', e);
  }
  
  console.log('🛑 Emergency audio kill complete');
};

// Run immediately
killAllAudio();

// Run again after DOM loads
document.addEventListener('DOMContentLoaded', killAllAudio);

// Run again after window loads
window.addEventListener('load', killAllAudio);

// Run every 3 seconds for the first 15 seconds to catch delayed audio
let killCount = 0;
const interval = setInterval(() => {
  killAllAudio();
  killCount++;
  if (killCount >= 5) {
    clearInterval(interval);
    console.log('🛑 Emergency audio killer stopped monitoring');
  }
}, 3000);