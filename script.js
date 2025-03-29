var currentSong = "brutal";
$(document).ready(function () {
  var songs = [
    {
      title: "traitor",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/traitor.mp3",
      color: "#622569"
    },
    {
      title: "drivers license",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/drivers license.mp3",
      color: "#92a8d1"
    },
    {
      title: "1 step forward 3 steps back",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/1 step forward 3 steps back.mp3",
      color: "#f7cac9"
    },
    {
      title: "deja vu",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/deja vu.mp3",
      color: "#5d0126"
    },
    {
      title: "good 4 u",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/good 4 u.mp3",
      color: "#c94c4c"
    },
    {
      title: "enough for you",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/enough for you.mp3",
      color: "#c3af50"
    },
    {
      title: "happier",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/happier.mp3",
      color: "#b1cbbb"
    },
    {
      title: "jealousy, jealousy",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/jealousy, jealousy.mp3",
      color: "#ffef96"
    },
    {
      title: "favorite crime",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/favorite crime.mp3",
      color: "#ff7b25"
    },
    {
      title: "hope ur ok",
      artist: "Olivia Rodrigo",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b2/Olivia_Rodrigo_-_SOUR.png",
      audioFile: "mp3/hope ur ok.mp3",
      color: "#034f84"
    }
  ];

  for (let song of songs) {
    $("#songs").append(
      '<li class="song" data-audio="' +
        song.audioFile +
        '" data-color="' +
        song.color +
        '">' +
        '<img src="' +
        song.cover +
        '">' +
        '<p class="song-title">' +
        song.title +
        "</p>" +
        '<p class="song-artist">' +
        song.artist +
        "</p>" +
        "</li>"
    );
  }

  $(".jcarousel").jcarousel({
    wrap: "circular"
  });
});

/*
 * Replace all SVG images with inline SVG
 */
jQuery('img[src$=".svg"]').each(function () {
  var $img = jQuery(this);
  var imgID = $img.attr("id");
  var imgClass = $img.attr("class");
  var imgURL = $img.attr("src");

  jQuery.get(
    imgURL,
    function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find("svg");

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr("xmlns:a");

      // Replace image with new SVG
      $img.replaceWith($svg);
    },
    "xml"
  );
});

// Current slide
$(".jcarousel").on("jcarousel:visiblein", "li", function (event, carousel) {
  let cover = $(this).find("img").attr("src");
  let songTitle = $(this).find("p.song-title").html();
  let songArtist = $(this).find("p.song-artist").html();
  let audioSrc = $(this).attr("data-audio");
  let backgroundColor = $(this).attr("data-color");
  $("body").css("background", backgroundColor);
  $("#background").css("background-image", "url(" + cover + ")");
  $("audio")
    .find("source")
    .attr("src", "" + audioSrc + "");
  player.load();
  player.currentTime = 0;
  $("#song-info").find("img").attr("src", cover);
  $("#song-info .artist-wrap p").find("span.title").html(songTitle);
  currentSong = songTitle;
  if (likedSongs.includes(currentSong)) {
    $("#heart-icon").addClass("active");
    $("#heart-icon").removeClass("fa-heart-o");
    $("#heart-icon").addClass("fa-heart");
  } else {
    $("#heart-icon").removeClass("active");
    $("#heart-icon").addClass("fa-heart-o");
    $("#heart-icon").removeClass("fa-heart");
  }
  $("#song-info .artist-wrap p").find("span.artist").html(songArtist);
});

// Previous slide
$("#previous-btn").click(function () {
  $(".jcarousel").jcarousel("scroll", "-=1");
  $("#play-btn i").removeClass("fa-pause");
  player.pause();
});

// Next slide
$("#next-btn").click(function () {
  if ($(".fa-random").hasClass("active")) {
    let songs = $("#songs li").length - 1;
    let randomSong = Math.floor(Math.random() * songs) + 1;
    $(".jcarousel").jcarousel("scroll", "+=" + randomSong);
  } else {
    $(".jcarousel").jcarousel("scroll", "+=1");
  }
  $("#play-btn i").removeClass("fa-pause");
  player.pause();
});

// Play Icon Switcher
$("#play-btn").click(function () {
  $(this).find("i").toggleClass("fa-pause");
});

// Menu
$("#menu-btn").click(function () {
  $("#content-wrap").addClass("inactive");
  $("#sidemenu").addClass("active");
});

// Home Button
$("#home-btn").click(function () {
  $("#home-screen").addClass("active");
  $(".menu").removeClass("active");
  $("#content-wrap").addClass("minimized");
});

// App
$(".app-icon").click(function () {
  $("#content-wrap").removeClass("minimized");
  setTimeout(function () {
    $("#home-screen").removeClass("active");
  }, 300);
});

function darkMode() {
  $("#iphone").addClass("dark-mode");
  $("#camera span").addClass("dark-mode");
  $("div#screen").addClass("dark-mode");
}

function lightMode() {
  $("#iphone").removeClass("dark-mode");
  $("#camera span").removeClass("dark-mode");
  $("#iphone").removeClass("dark-mode");
}
// Volume
$("#volume-btn").click(function () {
  if ($("#volume-btn").hasClass("fa-volume-off")) {
    $("#volume-btn").removeClass("fa-volume-off");
    $("#volume-btn").removeClass("active");

    $("#volume-btn").addClass("fa-volume-up");
    player.volume = 0.5;
  } else {
    $("#volume-btn").removeClass("fa-volume-up");
    $("#volume-btn").addClass("fa-volume-off");
    player.volume = 0;
  }
});
let likedSongs = [];
// Like
$("#heart-icon").click(function () {
  if ($("#heart-icon").hasClass("fa-heart")) {
    // $("#heart-icon").removeClass("active");
    $("#heart-icon").removeClass("fa-heart");
    $("#heart-icon").addClass("fa-heart-o");
    delete likedSongs[likedSongs.indexOf(currentSong)];
    console.log(likedSongs);
  } else {
    $("#heart-icon").addClass("active");
    $("#heart-icon").removeClass("fa-heart-o");
    $("#heart-icon").addClass("fa-heart");
    likedSongs.push(currentSong);
    console.log(likedSongs);
  }
});

$("#sub-controls i").click(function () {
  if (!$(this).hasClass("fa-volume-up") && !$(this).hasClass("fa-heart")) {
    $(this).toggleClass("active");
  }
});

$("#background-wrap div").click(function() {
  console.log("CLICK");
});

/*
 * Music Player
 * By Greg Hovanesyan
 * https://codepen.io/gregh/pen/NdVvbm
 */

var audioPlayer = document.querySelector("#content");
var playpauseBtn = audioPlayer.querySelector("#play-btn");
var progress = audioPlayer.querySelector(".progress");
var sliders = audioPlayer.querySelectorAll(".slider");
var player = audioPlayer.querySelector("audio");
var currentTime = audioPlayer.querySelector("#current-time");
var totalTime = audioPlayer.querySelector("#total-time");

var draggableClasses = ["pin"];
var currentlyDragged = null;

window.addEventListener("mousedown", function (event) {
  if (!isDraggable(event.target)) return false;

  currentlyDragged = event.target;
  let handleMethod = currentlyDragged.dataset.method;

  this.addEventListener("mousemove", window[handleMethod], false);

  window.addEventListener(
    "mouseup",
    () => {
      currentlyDragged = false;
      window.removeEventListener("mousemove", window[handleMethod], false);
    },
    false
  );
});

playpauseBtn.addEventListener("click", togglePlay);
player.addEventListener("timeupdate", updateProgress);
player.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener("ended", function () {
  player.currentTime = 0;

  if ($(".fa-refresh").hasClass("active")) {
    togglePlay();
  } else {
    if ($(".fa-random").hasClass("active")) {
      let songs = $("#songs li").length - 1;
      let randomSong = Math.floor(Math.random() * songs) + 1;
      $(".jcarousel").jcarousel("scroll", "+=" + randomSong);
    } else {
      $(".jcarousel").jcarousel("scroll", "+=1");
    }
    togglePlay();
  }
});

sliders.forEach((slider) => {
  let pin = slider.querySelector(".pin");
  slider.addEventListener("click", window[pin.dataset.method]);
});

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach((draggable) => {
    if (classes.indexOf(draggable) !== -1) canDrag = true;
  });
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let direction = rangeBox.dataset.direction;
  let screenOffset = document.querySelector("#screen").offsetLeft + 26;
  var min = screenOffset - rangeBox.offsetLeft;
  var max = min + rangeBox.offsetWidth;
  if (event.clientX < min || event.clientX > max) {
    return false;
  }
  return true;
}

function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + "%";

  currentTime.textContent = formatTime(current);
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if (event.type == "click" && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if (event.type == "mousemove") {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
  let slider = getRangeBox(event);
  let screenOffset = document.querySelector("#screen").offsetLeft + 26;
  let K = 0;
  let offsetX = event.clientX - screenOffset;
  let width = slider.clientWidth;
  K = offsetX / width;
  return K;
}

function rewind(event) {
  if (inRange(event)) {
    player.currentTime = player.duration * getCoefficient(event);
  }
}

function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ":" + (sec < 10 ? "0" + sec : sec);
}

function togglePlay() {
  player.volume = 0.5;
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}
