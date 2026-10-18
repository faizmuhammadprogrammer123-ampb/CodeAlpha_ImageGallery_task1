const galleryItems = [
    ...document.querySelectorAll(".gallery-item")
];

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = galleryItems;
let currentIndex = 0;

// Filter images
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        galleryItems.forEach(item => {

            const matches =
                category === "all" ||
                item.dataset.category === category;

            item.style.display = matches ? "" : "none";

        });

        visibleItems = galleryItems.filter(item => {
            return item.style.display !== "none";
        });

    });

});

// Open lightbox
galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        visibleItems = galleryItems.filter(element => {
            return element.style.display !== "none";
        });

        currentIndex = visibleItems.indexOf(item);

        showImage(currentIndex);

        lightbox.classList.add("open");

        document.body.style.overflow = "hidden";

    });

});

// Display selected image
function showImage(index) {

    if (visibleItems.length === 0) {
        return;
    }

    currentIndex =
        (index + visibleItems.length) % visibleItems.length;

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

}

// Next image
nextBtn.addEventListener("click", () => {

    showImage(currentIndex + 1);

});

// Previous image
prevBtn.addEventListener("click", () => {

    showImage(currentIndex - 1);

});

// Close lightbox
function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow = "";

}

closeBtn.addEventListener("click", closeLightbox);

// Close by clicking the background
lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

// Keyboard navigation
document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("open")) {
        return;
    }

    if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});