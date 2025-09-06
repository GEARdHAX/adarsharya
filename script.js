let imageIndex = 0;
let images = ["media/pfp2.jpg", "media/pfp.jpg", "media/pfp3.jpg"];
let img = document.querySelector(".circle img");

setInterval(() => {
 img.style.opacity = 0; // Fade out the image
 setTimeout(() => {
  imageIndex = (imageIndex + 1) % images.length;
  img.src = images[imageIndex];
  img.style.opacity = 1; // Fade in the new image
 }, 300); // Wait for 500ms before changing the image to allow fade out effect
}, 3500); // Change image every 2 seconds

const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");
const menu_items = document.querySelectorAll("nav .mainMenu li a");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

// close menu when you click on a menu item
menu_items.forEach((item) => {
 item.addEventListener("click", function () {
  close();
 });
});

function show() {
 mainMenu.style.display = "flex";
 mainMenu.style.top = "0";
}
function close() {
 mainMenu.style.top = "100%";
}

const dynamicText = document.getElementById("dynamic-text");
const cursor = document.querySelector(".cursor");
const words = [" Developer", " Programmer", " Freelancer"];
const colors = ["#37ff8b"];

let charIndex = 0;
let wordIndex = 0;
let erasingTime = getRandomTime(50, 50);
let typingTime = getRandomTime(50, 50);
const newWordTime = 1000; //time before starting to write new word
const finishedWordTime = 2000; //time before starting to erase word

function type() {
 if (charIndex >= words[wordIndex].length) {
  cursor.classList.remove("blinking"); //remove the blinking of the cursor while erasing
  dynamicText.textContent = dynamicText.textContent.slice(
   0,
   dynamicText.textContent.length - 1
  );
  if (dynamicText.textContent.length === 0) {
   charIndex = 0;
   wordIndex++;
  }
  if (wordIndex >= words.length) {
   wordIndex = 0;
  }
  time = charIndex === 0 ? newWordTime : erasingTime; // if finished erasing word time is 1.8s, else is erasing time
  if (time === newWordTime) cursor.classList.add("blinking"); //if finished erasing word, cursor starts blinking
  setTimeout(type, time);
 } else {
  cursor.classList.remove("blinking"); //remove blinking of cursor if typing
  if (charIndex === 0) dynamicText.style.color = getRandomColor(); //if at start of the word, get new color
  dynamicText.textContent += words[wordIndex][charIndex];
  charIndex++;
  time = charIndex >= words[wordIndex].length ? finishedWordTime : typingTime; // if finished typing word time is 2s, else is typing time
  if (time === finishedWordTime) cursor.classList.add("blinking"); // if finished typing word, cursor start blinking
  setTimeout(type, time);
 }
}

function getRandomTime(min, max) {
 return Math.random() * (max - min) + min;
}

function getRandomColor() {
 let max = colors.length - 1;
 let min = 0;
 return colors[Math.round(Math.random() * (max - min) + min)];
}

document.addEventListener("DOMContentLoaded", function () {
 setTimeout(type, 1000);
});

$(document).ready(function () {
 // Add smooth scrolling to all links
 $("a").on("click", function (event) {
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
   // Prevent default anchor click behavior
   event.preventDefault();

   // Store hash
   var hash = this.hash;

   // Using jQuery's animate() method to add smooth page scroll
   // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
   $("html, body").animate(
    {
     scrollTop: $(hash).offset().top,
    },
    600,
    function () {
     // Add hash (#) to URL when done scrolling (default click behavior)
     window.location.hash = hash;
    }
   );
  } // End if
 });
});
