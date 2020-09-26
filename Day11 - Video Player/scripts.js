// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenbtn = document.querySelector(".fullscreen");


// Build out functions

function togglePlay(){
    if(video.paused) {
        video.play();
    }else{
        video.pause();
    }
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime/ video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen(){

    console.log('Hello Ravi');

	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
    }else if(video.mozRequestFullScreen){
        video.mozRequestFullScreen();
    }
}

// Houkup the event listners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach( button => {
    button.addEventListener('click', skip);
});

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
})

ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate);
})

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => {
    if(mousedown){
        scrub();
    }
});

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreenbtn.addEventListener('click', toggleFullScreen);
