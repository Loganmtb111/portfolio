const scrollContainer = document.querySelector('#Interface_parcours');

let scrollAmount = 0; 
let isScrolling = false;

scrollContainer.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        scrollAmount += e.deltaY; 
        if (!isScrolling) smoothScroll();
    }
});

function smoothScroll() {
    isScrolling = true;
    scrollContainer.scrollLeft += scrollAmount * 0.1; 
    scrollAmount *= 0.9; 

    if (Math.abs(scrollAmount) > 0.5) {
        requestAnimationFrame(smoothScroll);
    } else {
        isScrolling = false; 
    }
}
