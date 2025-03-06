let images = [
   "images/pexels-alex-amorales-321095-909907.jpg",
   "images/pexels-cesarperez209-733745.jpg",
   "images/pexels-chaitaastic-2475808.jpg",
   "images/pexels-jmark-253096.jpg",
   "images/pexels-mayday-1545743.jpg",
   "images/pexels-mikebirdy-116675.jpg",
   "images/pexels-mikebirdy-170811.jpg",
   "images/pexels-mikebirdy-3729464.jpg",
   "images/pexels-sarmad-mughal-94606-305070.jpg"
]

let currentIndex = 0;

function openLightbox(img) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = img.src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(step) {
    currentIndex += step;

    // Xử lý vòng lặp khi hết ảnh
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    document.getElementById("lightbox-img").src = images[currentIndex];
}