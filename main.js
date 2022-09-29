const app = () => {
  // get main elements
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // get all sounds
  const sounds = document.querySelectorAll('.sound-picker button');

  // get time display
  const timeDisplay = document.querySelector('h3');
  const timeSelect = document.querySelectorAll('.time-select button');

  // get length of outline
  const outlineLength = outline.getTotalLength();

  // duration
  let duration = 600;

  // circle style
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // pick different video/song
  sounds.forEach((opt) => {
    opt.onclick = function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
    };
  });

  // play sound
  play.onclick = () => {
    isPlaying(song);
  };

  // select sound duration
  timeSelect.forEach((opt) => {
    opt.onclick = function () {
      duration = this.getAttribute('data-time');
      timeDisplay.innerHTML = `${Math.ceil(duration / 60)}:${Math.ceil(duration % 60)}`;
    };
  });
 
  // fetch function for song to play and pause
  const isPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  // animate circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let sec = Math.ceil(elapsed % 60);
    let min = Math.floor(elapsed / 60);

    // animate progress
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // animate text
    timeDisplay.innerHTML = `${min}:${sec}`;

    // stop all once time up
    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  };
};
app();
