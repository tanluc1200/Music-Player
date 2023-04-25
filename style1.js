const songs = [
    {
        name: "Typa Girl",
        artist: "Blackpink",
        thumbnail: "./img/typal girl.jpg",
        path: "./songs/BLACKPINK - ‘Typa Girl’ (Official Audio).mp3",
    },
    {
        name: "Flower",
        artist: "Jisoo",
        thumbnail: "./img/flower.webp",
        path: "./songs/JISOO FLOWER Lyrics (지수 꽃 가사) (Color Coded Lyrics).mp3",
    },
    {
        name: "Lalisa",
        artist: "Lisa",
        thumbnail: "./img/lalisa.webp",
        path: "./songs/LISA LALISA Lyrics (리사 LALISA 가사) (Color Coded Lyrics).mp3",
    },
    {
        name: "Solo",
        artist: "Jennie",
        thumbnail: "./img/solo.jpg",
        path: "./songs/JENNIE (BLACKPINK) - SOLO (Color Coded Lyrics Eng-Rom-Han).mp3",
    },
    {
        name: "Pink Venom",
        artist: "BLACKPINK",
        thumbnail: "./img/pinkvennom.jpg",
        path: "./songs/BLACKPINK - ‘Pink Venom’ (Official Audio).mp3",
    },
    {
        name: "Shut Down",
        artist: "BLACKPINK",
        thumbnail: "./img/shut-down.jpg",
        path: "./songs/BLACKPINK - ‘Shut Down’ (Official Audio).mp3",
    },
    {
        name: "boombayah",
        artist: "blackpink",
        thumbnail: "./img/boombayyah.jpg",
        path: "./songs/BOOMBAYAH.mp3",
    },
    {
        name: "how you like that",
        artist: "blackpink",
        thumbnail: "./img/220px-Blackpink_-_How_You_Like_That.png",
        path: "./songs/BLACKPINK (블랙핑크) - How You Like That [MP3 Audio] [THE ALBUM].mp3",
    },
    {
        name: "AS IF IT'S YOUR LAST",
        artist: "blackpink",
        thumbnail: "./img/as if you last dance.jpg",
        path: "./songs/AS IF IT'S YOUR LAST.mp3",
    },
    {
        name: "money",
        artist: "lisa",
        thumbnail: "./img/money.jpeg",
        path: "./songs/MONEY.mp3",
    },
    {
        name: "DDU-DU DDU-DU",
        artist: "blackpink",
        thumbnail: "./img/dudududu.jpg",
        path: "./songs/[Full Audio] BLACKPINK - 뚜두뚜두 (DDU-DU DDU-DU).mp3",
    },
    {
        name: "on the ground",
        artist: "rosé",
        thumbnail: "./img/ontheground.jpg",
        path: "./songs/ROSÉ - On The Ground (Official Audio).mp3",
    },
    {
        name: "sour candy",
        artist: "lady gaga - blackpink",
        thumbnail: "./img/sour-candy-1122.jpeg",
        path: "./songs/Lady Gaga, BLACKPINK - Sour Candy (Audio).mp3",
    },
    {
        name: "gone",
        artist: "rosé",
        thumbnail: "./img/gone.jpg",
        path: "./songs/ROSÉ 'Gone' Lyrics (로제 Gone 가사) (Color Coded Lyrics).mp3",
    },
];
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const audio = $(".audio");
const inputSong = $("#inputSong");
const currentTime = $(".currentTime");
const durationSong = $(".durationSong");
const titleSong = $(".titleSong");
const thumbnail = $(".thumbnail-cd");
const playlistBlocks = $$(".playlist-block");
const playlistBlock = $(".playlist-block");
const playlistImg = $(".playlist-img");
let playListImgRotateItem;
const playList = $(".playlist");
const thumbnail_cd = $(".thumbnail-cd");
const btnPlay = $(".btn-play");
const btnNext = $(".btn-next");
const btnPrev = $(".btn-prev");
const btnRepeat = $(".btn-repeat");
const btnShuffle = $(".btn-shuffle");
const isPlay = $(".btn-toggle-play");
const formSearch = $(".form-search");
let img_rotate;
let isPlaying = false;
let isRepeating = false;
let currentSongIndex = 0;
let isRandom = false;
let isAnimating = true;
let rotationDeg = 0;
let c;
let isSearch = false;
function renderPlaylist() {
    const playlistHtml = songs
        .map(
            (song, index) => `
        <div class="playlist-block" song-index = "${index}" song-name = "${song.name}">
            <img class="playlist-img" src="${song.thumbnail}" img-index 
            = "${index}" alt="${song.name}">
            <div class="playlist-row">
            <h2 class="playlist-title">${song.name}</h2>
            <p class="playlist-singer">${song.artist}</p>
            </div>
        </div>
        `
        )
        .join("");
    playList.innerHTML = playlistHtml;
}
function loadCurrentSong(e = currentSongIndex) {
    thumbnail_cd.src = songs[e].thumbnail;
    titleSong.innerText = songs[e].name;
    audio.src = songs[e].path;
    audio.pause();
    if (currentSongIndex !== 0) {
        Thumbnail_Rotate.play();
    }
    updateStatusActivePlaylistBlock();
}

function updateStatusActivePlaylistBlock() {
    // Cập nhật lại trạng thái "active" của phần tử trong danh sách phát
    const previousActiveItem = $(".playlist-block.active");
    if (previousActiveItem !== null) {
        previousActiveItem.classList.remove("active");
    }
    const currentActiveItem = $(
        `.playlist-block[song-index="${currentSongIndex}"]`
    );
    if (currentActiveItem !== null) {
        currentActiveItem.classList.add("active");
    }
}
function scrollToActiveSong() {
    setTimeout(() => {
        const songActive = document.querySelector(".playlist-block.active");
        songActive.scrollIntoView({
            behavior: "smooth",
            // block: "center",
            // inline: "start",
        });
    }, 100);
}

// function animate() {
//     const image = $(`.playlist-img[img-index="${currentSongIndex}"]`);
//     if (image !== null) {
//         rotationDeg = (rotationDeg + 1) % 360;
//         image.style.transform = `rotate(${rotationDeg}deg)`;
//     }
//     if (isAnimating) {
//         requestAnimationFrame(animate);
//     }
// }
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
let interval;
let isCLickIconSearch = false;
function handleEvent() {
    let text = currentTime.innerText;
    // playlistBlockThumbnail = playlistImg.animate(
    //     [{ transform: "rotate(360deg)" }],
    //     {
    //         duration: 5000, //
    //         iterations: Infinity,
    //     }
    // );
    // playlistBlockThumbnail.pause();
    // Xử lý xoay Thumbnail 360deg
    Thumbnail_Rotate = thumbnail_cd.animate([{ transform: "rotate(360deg)" }], {
        duration: 10000, //
        iterations: Infinity,
    });
    Thumbnail_Rotate.pause();
    // Xử lý khi click vào Home
    const iconHome = $(".fa-house");
    iconHome.onclick = function () {
        // if (isCLickIconSearch) {
        //     iconHome.style.pointerEvents = "none";
        //     iconHome.style.cursor = "none";
        // } else {
        location.reload();
        // }
    };
    // Xử lý khi click vào icon Search
    const iconSearch = $(".fa-solid.fa-magnifying-glass");
    iconSearch.onclick = function (e) {
        formSearch.style.visibility = "visible";
        isCLickIconSearch = true;
    };
    // Xử lý khi click vào icon close search
    const closeSearch = $("#close-icon");
    closeSearch.onclick = function () {
        $(".form-search-input").value = "";
        formSearch.style.visibility = "hidden";
        isSearch = false;
        isCLickIconSearch = false;
    };
    // xử lý form search khi thay đổi input
    formSearch.oninput = function () {
        const key = document.querySelector(".form-search-input");
        key.value = key.value.trimStart();
        if (key.value != "") {
            isSearch = true;
        } else {
            isSearch = false;
        }
        searchSong();
    };

    btnPlay.onclick = function () {
        if (!isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    // Xử lý khi next song - tiếp theo 1
    btnNext.onclick = function () {
        if (!isSearch) {
            if (isRandom) {
                randomSong();
            } else {
                currentSongIndex++;
                if (currentSongIndex >= songs.length) {
                    currentSongIndex = 0;
                }
            }
            loadCurrentSong(currentSongIndex);
            audio.play();
            updateStatusActivePlaylistBlock();
            scrollToActiveSong();
        }
    };
    // Xử lý khi previous song - lùi lại 1
    btnPrev.onclick = function () {
        if (!isSearch) {
            if (isRandom) {
                randomSong();
            } else {
                currentSongIndex--;
                // isPlaying = !isPlaying;
                if (currentSongIndex < 0) {
                    currentSongIndex = songs.length - 1;
                }
            }
            loadCurrentSong(currentSongIndex);
            audio.play();
            updateStatusActivePlaylistBlock();
            scrollToActiveSong();
        }
    };
    // Xử lý audio khi play
    audio.onplay = function () {
        isAnimating = true;
        isPlaying = true;
        isPlay.classList.replace("fa-play", "fa-pause");
        Thumbnail_Rotate.play();
        interval = setInterval(() => {
            const current = audio.currentTime;
            currentTime.innerText = formatTime(current);
        }, 1000);
        // time();
        // animate();
    };
    // Xử lý audio khi pause
    audio.onpause = function () {
        isAnimating = false;
        isPlaying = false;
        isPlay.classList.replace("fa-pause", "fa-play");
        Thumbnail_Rotate.pause();
        clearInterval(interval);
        // cancelAnimationFrame(c);
    };
    // Xử lý khi click repeat
    btnRepeat.onclick = function () {
        isRepeating = !isRepeating;
        this.classList.toggle("active");
        audio.loop = this.classList.contains("active");
    };
    // Xử lý sự kiện loadedmetadata
    audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        durationSong.innerText = formatTime(duration);
        // inputSong.max = duration;
    });
    // Xử lý thanh thời gian khi play song
    audio.ontimeupdate = function () {
        if (audio.duration) {
            const durationPercent = Math.floor(
                (audio.currentTime / audio.duration) * 100
            );
            inputSong.value = durationPercent;
            currentTime.value = durationPercent;
        }
    };
    // Xử lý khi tua thanh thời gian
    inputSong.oninput = () => {
        const seekTime = audio.duration * (inputSong.value / 100);
        audio.currentTime = seekTime;
    };
    // Xử lý next bài hát tiếp theo khi kết thúc bài hát khi ko repeat
    audio.onended = () => {
        if (isRepeating === false) {
            btnNext.click();
        }
    };
    // Xử lý Playlists, khi nhấn vào từng item con
    playList.onclick = (e) => {
        const itemClick = e.target.closest(".playlist-block");
        if (itemClick) {
            if (isSearch) {
                const songName = itemClick.getAttribute("song-name");
                songs.forEach((e, index) => {
                    if (e.name === songName) {
                        currentSongIndex = index;
                    }
                    updateStatusActivePlaylistBlock();
                });
            } else {
                const songIndex = itemClick.getAttribute("song-index");
                currentSongIndex = parseInt(songIndex);
            }
            loadCurrentSong(currentSongIndex);
            updateStatusActivePlaylistBlock();
            scrollToActiveSong();
            audio.play();
        }
    };
    // Xử lý khi click Repeat
    btnShuffle.onclick = () => {
        isRandom = !isRandom;
        btnShuffle.classList.toggle("active");
    };
}
function randomSong() {
    const songNoActive = songs.filter(
        (song, index) => index !== currentSongIndex
    );
    const songRandom = Math.floor(Math.random() * songNoActive.length);
    currentSongIndex = songRandom;
}
let resultSearch = [];
function searchSong() {
    const inputUser = $(".form-search-input");
    inputUser.addEventListener("input", () => {
        const keyword = inputUser.value.toLowerCase();
        resultSearch = songs.filter(
            (song) =>
                song.name.toLowerCase().includes(keyword) ||
                song.artist.toLowerCase().includes(keyword)
        );
    });
    displayResults(resultSearch);
}
function displayResults(results) {
    if (results.length > 0) {
        const html = results.map(function (song, index) {
            return `
            <div class="playlist-block" song-index = "${index}" song-name = "${song.name}">
            <img class="playlist-img" src="${song.thumbnail}" img-index 
            = "${index}" alt="${song.name}">
            <div class="playlist-row">
            <h2 class="playlist-title">${song.name}</h2>
            <p class="playlist-singer">${song.artist}</p>
            </div>
        </div>
            `;
        });
        playList.innerHTML = html.join("");
        playList.addEventListener("click", (e) => {});
    } else {
        playList.innerHTML = "Không tìm thấy";
    }
}
function playSong(songIndex) {
    const selectedSong = songs.find((song) => song.index === songIndex);
    const resultSearchIndex = resultSearch.findIndex(
        (song) => song.index === songIndex
    );
    displayResults([selectedSong]);
    currentSongIndex = resultSearchIndex;
}
function start() {
    handleEvent();
    renderPlaylist();
    loadCurrentSong();
}
start();
