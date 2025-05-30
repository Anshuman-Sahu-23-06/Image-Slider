// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let timeDom = document.querySelector('.carousel .time');

// Move first thumbnail to end for seamless loop
thumbnailBorderDom.appendChild(thumbnailBorderDom.children[0]);

// Timing configurations
let timeRunning = 3000;
let timeAutoNext = 7000;

// Event listeners for next/prev buttons
nextDom.onclick = () => showSlider('next');
prevDom.onclick = () => showSlider('prev');

// Auto slide logic
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Main slider function
function showSlider(type) {
    let SliderItemsDom = SliderDom.children;
    let thumbnailItemsDom = thumbnailBorderDom.children;

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

// Optional: Pause auto slide on mouse hover
carouselDom.addEventListener('mouseenter', () => {
    clearTimeout(runNextAuto);
});
carouselDom.addEventListener('mouseleave', () => {
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
});
