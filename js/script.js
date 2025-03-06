const toggleButton = document.querySelector(".menu-toggle");
if (toggleButton) {
    toggleButton.addEventListener("click", function() {
        document.querySelector(".menu").classList.toggle("active");
    });
} else {
    console.error("Không tìm thấy .menu-toggle");
}

