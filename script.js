let container = document.querySelector('.container');
let video = document.querySelector('video');
let progressArea = document.querySelector('.container .progress-area');
let progressBar = document.querySelector('.container .progress-area .progress-bar');
let volumeIcon = document.querySelector('.container .volume-box .volume');
let volumeInput = document.querySelector('.container .volume-box input');
let curr_time = document.querySelector('.container .time-and-btns .current-time');
let ttl_time = document.querySelector('.container .time-and-btns .total-time');
let fastRewind = document.querySelector('.container .time-and-btns .fast-rewind');
let fastForward = document.querySelector('.container .time-and-btns .fast-forward');
let playPauseBtn = document.querySelector('.container .time-and-btns .play-pause-btn');
let playPauseIcon = document.querySelector('.container .time-and-btns .play-pause-btn i');
let settingIcon = document.querySelector('.container .others .setting');
let fullScreenBtn = document.querySelector('.container .others .full-screen');
let playBackBox = document.querySelector('.container .playback-speed');
let settingBox = document.querySelector('.container .settings');

// toggle playback box
settingIcon.addEventListener('click', () => {
    playBackBox.classList.toggle('show');
});

// play plause video
playPauseBtn.addEventListener('click', () => {
    if (playPauseBtn.classList.contains('play')) {
        playPauseIcon.innerHTML = 'pause';
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
        video.play();
    } else {
        playPauseIcon.innerHTML = 'play_arrow'
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
        video.pause();
    }
});

// fast forward 
fastForward.addEventListener('click', () => {
    video.currentTime += 10;
});

// fast rewind 
fastRewind.addEventListener('click', () => {
    video.currentTime -= 10;
});

// get total duration
video.addEventListener('loadeddata', () => {
    let d = video.duration;
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    if (s < 10) {
        s = "0" + s
    }

    ttl_time.innerHTML = `${h}:${m}:${s}`;

    progressArea.addEventListener('click', (e) => {
        let progressWidth = progressArea.clientWidth;
        let clickedoffsetX = e.offsetX;
        let videoDuration = video.duration;
        video.currentTime = (clickedoffsetX / progressWidth) * videoDuration;
        video.play();
        playPauseIcon.innerHTML = 'pause';
        playPauseBtn.classList.remove('play');
    });
});

// get current time of 
video.addEventListener('timeupdate', () => {
    let d = video.currentTime;
    let ttl_d = video.duration;
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    if (s < 10) {
        s = "0" + s;
    }

    curr_time.innerHTML = `${h}:${m}:${s}`;
    // increase progress bar width on time update
    let progressWidth = (d / ttl_d) * 100;
    progressBar.style.width = `${progressWidth}%`
})

// set volume 
volumeInput.addEventListener('input', () => {
    video.volume = volumeInput.value;
    if (volumeInput.value == 0) {
        volumeIcon.innerHTML = 'volume-off';
    } else {
        volumeIcon.innerHTML = 'volume-up';
    }
});

// on video end
video.addEventListener('ended', () => {
    video.currentTime = 0;
    playPauseIcon.innerHTML = 'play_arrow';
    playPauseBtn.classList.remove('pause');
    playPauseBtn.classList.add('play');
});

// video speed
let changeSpeed = (speed) => {
    video.playbackRate = speed;
    playBackBox.classList.remove('show');
};

// full screen 
fullScreenBtn.addEventListener('click', () => {
    container.classList.toggle('fullscreen');
    video.classList.toggle('fullvideo');
    if (fullScreenBtn.classList.contains('fullscreen')) {
        fullScreenBtn.innerHTML = 'close_fullscreen';
        fullScreenBtn.classList.add('full-screen');
    }else{
        fullScreenBtn.innerHTML = "fullscreen";
        fullScreenBtn.classList.add('full-screen');
    }
});

// toggle seetingBox
video.addEventListener('click', () => {
    settingBox.classList.toggle('settingBox-hide-show');
});

// volume icon
volumeIcon.addEventListener('click', () => {
    if (volumeIcon.classList.contains('vol-up')) {
        // volumeIcon.innerHTML = 'volume_off';
        // volumeIcon.classList.remove('vol-up');
        volumeInput.value = 0;
        video.volume = 0;
    } else {
        // volumeIcon.innerHTML = 'volume_up';
        // volumeIcon.classList.add('vol-up');
        volumeInput.value = 0.5;
        video.volume = 0.5;
    }
})
