const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play-btn')
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".video")
    const sounds = document.querySelectorAll(".theme-selection button")
    const timeDisplay = document.querySelector('.chrono h3')
    const timeSelect = document.querySelectorAll(".time-selection button");
    // get the length of the outline
    const outlineLength = outline.getTotalLength();

    //Duration => from time selection
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound =>{
        sound.addEventListener("click", function () {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkedPlaying(song);
       }) 
    });
    //play sound
    play.addEventListener("click", () => {
        checkedPlaying(song);
    })

    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration/60)}:${Math.floor(duration%60)}`
        })
    })
    
    const checkedPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg"
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg"
        }
    }

    // Animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`

        if (currentTime >= duration) {
            song.pause();
            song.curretnTime = 0;
            play.src = "./svg/play.svg"
            video.pause();
        }

    }
}

app();