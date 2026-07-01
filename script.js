const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            revealElements[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* KHRONOS PROJECT SLIDER */
let projectSlideIndex = 1;

function showProjectSlide(n) {
    const slides = document.querySelectorAll("#khronosSlider .slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    const thumbs = document.querySelectorAll(".slider-thumbnails .thumb");

    if (!slides.length) return;

    if (n > slides.length) projectSlideIndex = 1;
    if (n < 1) projectSlideIndex = slides.length;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    thumbs.forEach(thumb => thumb.classList.remove("active"));

    slides[projectSlideIndex - 1].classList.add("active");
    if (dots[projectSlideIndex - 1]) dots[projectSlideIndex - 1].classList.add("active");
    if (thumbs[projectSlideIndex - 1]) thumbs[projectSlideIndex - 1].classList.add("active");
}

function moveProjectSlide(n) {
    projectSlideIndex += n;
    showProjectSlide(projectSlideIndex);
}

function currentProjectSlide(n) {
    projectSlideIndex = n;
    showProjectSlide(projectSlideIndex);
}

window.addEventListener("load", function () {
    showProjectSlide(projectSlideIndex);
});


/* SLIDER EFFECTS + LARGE IMAGE MODAL */
function animateSliderButton(direction) {
    const slider = document.getElementById("khronosSlider");
    const button = direction > 0
        ? document.querySelector(".slider-btn.next")
        : document.querySelector(".slider-btn.prev");

    if (slider) {
        slider.classList.add("slide-changing");
        setTimeout(() => slider.classList.remove("slide-changing"), 320);
    }

    if (button) {
        button.classList.add("is-clicked");
        setTimeout(() => button.classList.remove("is-clicked"), 180);
    }
}

// Wrap the old moveProjectSlide function to add click effects
if (typeof moveProjectSlide === "function" && !window.moveProjectSlideEnhanced) {
    const originalMoveProjectSlide = moveProjectSlide;

    window.moveProjectSlide = function (n) {
        animateSliderButton(n);
        originalMoveProjectSlide(n);
    };

    window.moveProjectSlideEnhanced = true;
}

let modalSlideIndex = 1;

function getProjectSlides() {
    return document.querySelectorAll("#khronosSlider .slide");
}

function openProjectImage(button) {
    const slides = Array.from(getProjectSlides());
    const currentSlide = button.closest(".slide");
    const index = slides.indexOf(currentSlide);

    modalSlideIndex = index >= 0 ? index + 1 : projectSlideIndex;
    showModalImage(modalSlideIndex);

    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function showModalImage(n) {
    const slides = getProjectSlides();
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");

    if (!slides.length || !modalImage || !modalCaption) return;

    if (n > slides.length) modalSlideIndex = 1;
    if (n < 1) modalSlideIndex = slides.length;

    const selectedSlide = slides[modalSlideIndex - 1];
    const selectedImage = selectedSlide.querySelector("img");
    const selectedCaption = selectedSlide.querySelector(".image-caption");

    if (selectedImage) {
        modalImage.src = selectedImage.src;
        modalImage.alt = selectedImage.alt || "Large project screenshot";
    }

    modalCaption.textContent = selectedCaption ? selectedCaption.textContent.trim() : "";
}

function moveModalImage(n) {
    modalSlideIndex += n;
    showModalImage(modalSlideIndex);
}

function closeProjectImage() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

document.addEventListener("keydown", function (event) {
    const modal = document.getElementById("imageModal");
    const isOpen = modal && modal.classList.contains("show");

    if (!isOpen) return;

    if (event.key === "Escape") {
        closeProjectImage();
    }

    if (event.key === "ArrowLeft") {
        moveModalImage(-1);
    }

    if (event.key === "ArrowRight") {
        moveModalImage(1);
    }
});

document.addEventListener("click", function (event) {
    const modal = document.getElementById("imageModal");

    if (event.target === modal) {
        closeProjectImage();
    }
});


/* EQUATIA PROJECT SLIDER + MODAL */
let equatiaSlideIndex = 1;

function showEquatiaSlide(n) {
    const slides = document.querySelectorAll("#equatiaSlider .slide");
    const dots = document.querySelectorAll("#equatiaSlider + .slider-dots .dot");
    const thumbs = document.querySelectorAll("#equatiaSlider ~ .slider-thumbnails .thumb");

    if (!slides.length) return;

    if (n > slides.length) equatiaSlideIndex = 1;
    if (n < 1) equatiaSlideIndex = slides.length;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    thumbs.forEach(thumb => thumb.classList.remove("active"));

    slides[equatiaSlideIndex - 1].classList.add("active");
    if (dots[equatiaSlideIndex - 1]) dots[equatiaSlideIndex - 1].classList.add("active");
    if (thumbs[equatiaSlideIndex - 1]) thumbs[equatiaSlideIndex - 1].classList.add("active");
}

function moveEquatiaSlide(n) {
    const slider = document.getElementById("equatiaSlider");
    const button = n > 0
        ? slider.querySelector(".slider-btn.next")
        : slider.querySelector(".slider-btn.prev");

    if (slider) {
        slider.classList.add("slide-changing");
        setTimeout(() => slider.classList.remove("slide-changing"), 320);
    }

    if (button) {
        button.classList.add("is-clicked");
        setTimeout(() => button.classList.remove("is-clicked"), 180);
    }

    equatiaSlideIndex += n;
    showEquatiaSlide(equatiaSlideIndex);
}

function currentEquatiaSlide(n) {
    equatiaSlideIndex = n;
    showEquatiaSlide(equatiaSlideIndex);
}

let equatiaModalIndex = 1;

function getEquatiaSlides() {
    return document.querySelectorAll("#equatiaSlider .slide");
}

function openEquatiaImage(button) {
    const slides = Array.from(getEquatiaSlides());
    const currentSlide = button.closest(".slide");
    const index = slides.indexOf(currentSlide);

    equatiaModalIndex = index >= 0 ? index + 1 : equatiaSlideIndex;
    showEquatiaModalImage(equatiaModalIndex);

    const modal = document.getElementById("equatiaImageModal");
    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function showEquatiaModalImage(n) {
    const slides = getEquatiaSlides();
    const modalImage = document.getElementById("equatiaModalImage");
    const modalCaption = document.getElementById("equatiaModalCaption");

    if (!slides.length || !modalImage || !modalCaption) return;

    if (n > slides.length) equatiaModalIndex = 1;
    if (n < 1) equatiaModalIndex = slides.length;

    const selectedSlide = slides[equatiaModalIndex - 1];
    const selectedImage = selectedSlide.querySelector("img");
    const selectedCaption = selectedSlide.querySelector(".image-caption");

    if (selectedImage) {
        modalImage.src = selectedImage.src;
        modalImage.alt = selectedImage.alt || "Large Equatia screenshot";
    }

    modalCaption.textContent = selectedCaption ? selectedCaption.textContent.trim() : "";
}

function moveEquatiaModalImage(n) {
    equatiaModalIndex += n;
    showEquatiaModalImage(equatiaModalIndex);
}

function closeEquatiaImage() {
    const modal = document.getElementById("equatiaImageModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}

window.addEventListener("load", function () {
    showEquatiaSlide(equatiaSlideIndex);
});

document.addEventListener("keydown", function (event) {
    const equatiaModal = document.getElementById("equatiaImageModal");
    const isEquatiaOpen = equatiaModal && equatiaModal.classList.contains("show");

    if (!isEquatiaOpen) return;

    if (event.key === "Escape") {
        closeEquatiaImage();
    }

    if (event.key === "ArrowLeft") {
        moveEquatiaModalImage(-1);
    }

    if (event.key === "ArrowRight") {
        moveEquatiaModalImage(1);
    }
});

document.addEventListener("click", function (event) {
    const equatiaModal = document.getElementById("equatiaImageModal");

    if (event.target === equatiaModal) {
        closeEquatiaImage();
    }
});
